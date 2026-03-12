import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const placeholderArtists = [
    { id: '1', users: { name: 'Sarah Jenkins', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAej4OIbtJLE02P25vMp2c9mZDLh0Tcxt5oxvWT5vLjX6q1somhKxPPl7PQIRZ2g_6Fg5ZBR4dehhMuDDkPZTVVQoluFilvZRVOfqthTB2RnVrriHR82fW3UswYpA3Hbz7BQ9DN_SiPeC7WR540z4K36as6Y_nwLnXAI-yznxISaXXBgmHgPtJEQlENj-GmAdds7eWdWnl1OwGo3Ab36DgL9P7DS7r2QfUHDZtAPVeN9f0ETPqk9phLKTmvs7hmdHlFgFmPhwX8EHV2' }, specialties: ['Bridal'], location: 'New York, NY', rating: 4.9, review_count: 128, price_from: 250 },
    { id: '2', users: { name: 'Elena Rodriguez', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE77UkoR4nsj36FLn4rLy-9K3K2UQQabCPj_HbnyMkj2D382M9E281OT2YyeY43dJ8xDf5Ffu7dfLe_BhhODYFUiRlJVWZ3UhfhaYt7JkPLsLesevhM3Nye3ZaAEK2fFAh_ti6q_xeDXLJ8lYnnwhPD_Zn2kYKyjgNRUSj4E7CPzw_XccjOVHNIP1I39AATjQqm-y9i4dQWRR_kg7loVY-gmUzSx1_uukA_DT62HgjKuRnKuDsm4nWFIfAJzzC86ZAt-KtpsN_11OR' }, specialties: ['Editorial'], location: 'Brooklyn, NY', rating: 5.0, review_count: 42, price_from: 400 },
    { id: '3', users: { name: 'Marcus Chen', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByQQ-6YGOvJDJ8JXuk-p-Eq1rbuQHPQ47mtlNJ6rI4Xso5mpdyaSLyiEGWhnNkZ8LLU5aeyX0xPqrjQ-E8yxyN1FjyGaW8tA_rhof2Jy61Ce4ndtPM5QansppcJPdvY_u5ea8LFIs1jytf0f0SLS3C6124KLfJeuNMpT6lS_Cu3iu08oYsvmIj9auYwYYhnfwPKi8aH9nVSAd-xdwXnn7UZsGJayUv3AeTbRhWP2IqbzqzrEKKCoPlr6tI9IcjQIlMMfj0AXvkeWa2' }, specialties: ['Bridal', 'Top Rated'], location: 'Manhattan, NY', rating: 4.8, review_count: 215, price_from: 300 },
    { id: '4', users: { name: 'Zara X', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKniOiWTrBKjcUhPhXGqz2mVXBLBdJ_0wgsYtfbTFVmzcDH7z1zKVo4AcekB4g7G8soUT--mQv8Y7p2LIprINc4BYEcS3RqjjobeBOiVG_2YhsOQH_OO5ZdTCiRlhzl7-wE_qkRAAlE9GFIBcsO8UVpu1RlonbPI_piF6fB1XI2hItx8r7u4RWwBtzY_vaC9G6TGuNReTdoBiztnn2bRzeQRZvhNE7uEUJJZTFTNxT3Z-xY9oxNsYJ5o9wC_V9yOpBg9Yp2jOp9Zou' }, specialties: ['Avant-Garde'], location: 'Queens, NY', rating: 4.7, review_count: 89, price_from: 180 },
    { id: '5', users: { name: 'Priya Patel', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAaDjRgRh2GXlFvbptyQVr1TXJvSV6QFhGg3YdDphOlR4k-Oq6Ud9wCAmXxicbJnZKETIn04gH4SC4hiOKlZW3Sh1u-9oss2CAyylP0XsSuvZ4czhl-nse3JIP_rrAxCgSuRljlU0HXs19wRzLF0mp4qLInOzmongpXNqf57PHClz9XAKSOG2_HTIWdAn5Y2vxi4vjmoZf-z5AWsWLoNAVSORPsYUwHj8HwQl7mFMf8i3oNDv20esHe3m1e5xTU4TwH6gO8nimHFCn' }, specialties: ['Event'], location: 'Jersey City, NJ', rating: 4.9, review_count: 156, price_from: 200 },
    { id: '6', users: { name: 'Isabella Ross', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2cGtFIp37rL8Z2LGfuewMr_1txSMiuLpRZpMXKRRrGPq8rQs0EhSjTgrC6tRWE9PtxjR1LKysTLm-VvyN6WkPLcG0ggNwifcxZw6JMERkVwB6PXuieA-MUYmtJTeo0xYC2k5ZGYuetvjbvnNbQ4LRzORjwUzmda38ykL-4D3zSDByHXPT5F1loTB2_R9iHfbG7Vb5NijC9IphJH-WcLhXP05IHbczA4np6y5b1OT0KREcECls7rQqZOOiwhP027KOtnyjghgcg-Om' }, specialties: ['Bridal'], location: 'Staten Island, NY', rating: 4.6, review_count: 67, price_from: 225 },
]

export default function BrowsePage() {
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(true)
    const [locationSearch, setLocationSearch] = useState('New York, NY')

    useEffect(() => {
        fetchArtists()
    }, [])

    const fetchArtists = async () => {
        try {
            const { data, error } = await supabase
                .from('artists')
                .select('*, users!inner(name, avatar_url)')
                .order('rating', { ascending: false })
            if (!error && data && data.length > 0) {
                setArtists(data)
            } else {
                setArtists(placeholderArtists)
            }
        } catch {
            setArtists(placeholderArtists)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Search Bar */}
            <div className="sticky top-[65px] z-40 w-full bg-background-light py-4 border-b border-transparent">
                <div className="max-w-[850px] mx-auto px-4">
                    <div className="flex items-center justify-between bg-white rounded-[4px] border border-border-neutral shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] py-0 pl-0 pr-0 h-16">
                        <div className="flex-1 flex items-center h-full">
                            <div className="flex-1 flex items-center gap-3 px-6 h-full border-r border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                                <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                                <div className="flex flex-col justify-center w-full">
                                    <label className="text-[10px] font-bold tracking-wider uppercase text-text-main">Location</label>
                                    <input
                                        className="p-0 border-none text-sm text-text-main placeholder:text-slate-400 focus:ring-0 bg-transparent truncate font-medium w-full"
                                        placeholder="Where are you going?"
                                        type="text"
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-6 h-full border-r border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                                <span className="material-symbols-outlined text-primary text-2xl">calendar_today</span>
                                <div className="flex flex-col justify-center w-full">
                                    <label className="text-[10px] font-bold tracking-wider uppercase text-text-main">Date</label>
                                    <input className="p-0 border-none text-sm text-text-main placeholder:text-slate-400 focus:ring-0 bg-transparent truncate font-medium w-full" placeholder="Add dates" type="text" />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-6 h-full hover:bg-slate-50 cursor-pointer transition-colors">
                                <span className="material-symbols-outlined text-primary text-2xl">brush</span>
                                <div className="flex flex-col justify-center w-full">
                                    <label className="text-[10px] font-bold tracking-wider uppercase text-text-main">Service</label>
                                    <input className="p-0 border-none text-sm text-text-main placeholder:text-slate-400 focus:ring-0 bg-transparent truncate font-medium w-full" placeholder="Bridal, Editorial..." type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="pr-2 pl-2 h-full flex items-center">
                            <button className="bg-primary hover:bg-primary/90 text-white rounded-[4px] w-12 h-12 flex items-center justify-center shadow-md transition-colors flex-shrink-0">
                                <span className="material-symbols-outlined text-[20px] font-bold">search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 p-6 lg:p-10 pt-4">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6 mt-2">
                    <div className="pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-text-main text-base font-bold">Price Range</h3>
                            <span className="text-xs font-medium text-text-muted">$150 - $1200+</span>
                        </div>
                        <div className="px-2 pt-2 pb-2">
                            <div className="relative h-1.5 w-full rounded-full bg-slate-200">
                                <div className="absolute h-full rounded-full bg-text-main left-[10%] right-[30%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-text-main text-base font-bold mb-4">Event Type</h3>
                        <div className="flex flex-col gap-3">
                            {['Bridal', 'Bridal Party', 'Prom / Formal', 'Editorial'].map((type) => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <input className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all" type="checkbox" defaultChecked={type === 'Bridal'} />
                                    <span className="text-text-muted text-sm font-medium group-hover:text-primary transition-colors">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Makeup Aesthetic */}
                    <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-text-main text-base font-bold mb-4">Makeup Aesthetic</h3>
                        <div className="flex flex-col gap-3">
                            {['Natural & Clean', 'Soft Glam', 'Full Glam', 'Avant-Garde'].map((aesthetic) => (
                                <label key={aesthetic} className="flex items-center gap-3 cursor-pointer group">
                                    <input className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all" type="checkbox" />
                                    <span className="text-text-muted text-sm font-medium group-hover:text-primary transition-colors">{aesthetic}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Techniques */}
                    <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-text-main text-base font-bold mb-4">Techniques</h3>
                        <div className="flex flex-col gap-3">
                            {['Airbrush', 'SFX', 'Mature Skin', 'Melanin-Rich Specialty'].map((tech) => (
                                <label key={tech} className="flex items-center gap-3 cursor-pointer group">
                                    <input className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all" type="checkbox" />
                                    <span className="text-text-muted text-sm font-medium group-hover:text-primary transition-colors">{tech}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <section className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-text-muted">Showing {artists.length} results</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-text-muted">Sort by:</span>
                            <select className="border-none bg-transparent py-0 pl-2 pr-8 text-sm font-bold text-text-main focus:ring-0 cursor-pointer">
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Highest Rated</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {artists.map((artist) => (
                                <Link key={artist.id} to={`/artists/${artist.id}`}>
                                    <article className="group flex flex-col gap-4 cursor-pointer">
                                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100">
                                            <img
                                                alt={artist.users?.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                src={artist.users?.avatar_url}
                                            />
                                            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-text-main transition-colors z-10">
                                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-3 left-3 flex gap-2">
                                                {artist.specialties?.map((spec) => (
                                                    <span key={spec} className="px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-text-main">{spec}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="text-lg font-bold text-text-main leading-tight group-hover:text-primary transition-colors">{artist.users?.name}</h3>
                                                    <p className="text-sm text-text-muted">{artist.location}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-primary text-[16px] fill-current">star</span>
                                                    <span className="text-sm font-bold text-text-main">{artist.rating}</span>
                                                    <span className="text-xs text-text-muted">({artist.review_count})</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <p className="text-sm font-medium text-text-main">Starting at <span className="font-bold">${artist.price_from}</span></p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}
