import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function SavedArtistsPage() {
    const { user } = useAuth()
    const [savedArtists, setSavedArtists] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) fetchSavedArtists()
    }, [user])

    const fetchSavedArtists = async () => {
        try {
            const { data, error } = await supabase
                .from('saved_artists')
                .select('*, artists(*, users(name, avatar_url))')
                .eq('client_id', user.id)
            if (!error && data) setSavedArtists(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleUnsave = async (savedId) => {
        await supabase.from('saved_artists').delete().eq('id', savedId)
        setSavedArtists((prev) => prev.filter((s) => s.id !== savedId))
    }

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
    }

    return (
        <div className="flex flex-1 justify-center py-12 px-6">
            <div className="flex flex-col max-w-[1200px] flex-1">
                <div className="flex flex-col gap-2 p-4 mb-4">
                    <h1 className="text-text-main text-4xl font-black leading-tight tracking-[-0.033em]">Saved Artists</h1>
                    <p className="text-text-muted text-base">Your curated list of professional makeup artists and stylists.</p>
                </div>

                {savedArtists.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <span className="material-symbols-outlined !text-[64px] text-border-neutral mb-4">favorite_border</span>
                        <h2 className="text-2xl font-bold text-text-main">No saved artists yet</h2>
                        <p className="text-text-muted max-w-sm mt-2">Start exploring our directory and save your favorite artists for quick access.</p>
                        <Link to="/browse" className="mt-6 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors">
                            Explore Directory
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                        {savedArtists.map((saved) => {
                            const artist = saved.artists
                            return (
                                <div key={saved.id} className="flex flex-col bg-white border border-border-neutral rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative w-full aspect-[4/3] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${artist?.portfolio_urls?.[0] || artist?.users?.avatar_url || ''}")` }}>
                                        <button onClick={() => handleUnsave(saved.id)} className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full flex items-center justify-center text-primary cursor-pointer shadow-sm">
                                            <span className="material-symbols-outlined !text-[20px] fill-current">favorite</span>
                                        </button>
                                    </div>
                                    <div className="p-5 flex flex-col gap-2">
                                        <p className="text-text-main text-lg font-bold leading-tight">{artist?.users?.name}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-primary !text-[16px] fill-current">star</span>
                                            <p className="text-text-main text-sm font-semibold">{artist?.rating || 0}</p>
                                            <p className="text-text-muted text-sm">({artist?.review_count || 0} reviews)</p>
                                        </div>
                                        <p className="text-text-muted text-sm mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined !text-[16px]">location_on</span>
                                            {artist?.location || 'Location TBD'}
                                        </p>
                                        <Link to={`/artists/${artist?.id}`} className="mt-3 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg transition-colors text-sm text-center">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
