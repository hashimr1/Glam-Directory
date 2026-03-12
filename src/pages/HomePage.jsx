import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
    const [featuredArtists, setFeaturedArtists] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchLocation, setSearchLocation] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [searchService, setSearchService] = useState('')
    const { user } = useAuth()

    useEffect(() => {
        fetchFeaturedArtists()
    }, [])

    const fetchFeaturedArtists = async () => {
        try {
            const { data, error } = await supabase
                .from('artists')
                .select('*, users!inner(name, avatar_url)')
                .order('rating', { ascending: false })
                .limit(4)
            if (!error && data) {
                setFeaturedArtists(data)
            }
        } catch (err) {
            console.error('Error fetching artists:', err)
        } finally {
            setLoading(false)
        }
    }

    // Placeholder artists for when DB is empty
    const placeholderArtists = [
        { id: '1', users: { name: 'Sarah Jenkins', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBebHHlamd5HjNx2tYIgenRzF505JHKuIvpXtB8mdwUeGgQQhCPfhiHJBeA7k_mW-wL7HNvxL4-6AdlOHWfXLIlZsAGY8yZbaOqJRO14ILljjaKopJ4pwEJzurPvjk7urq3e5HiylhyezD5azExFRTTGBG3AIv6b6TaLqwgL3o7h3yaQR34b8peUAQGQ97xoY3szeeW0mXWf6HJTbJaUSZi8zjidCqBU7uC8J_0KIvjxA6zDWGCyb2giAQA8NzlgMT3a7CvQN49fmuS' }, specialties: ['Bridal'], location: 'New York', rating: 4.9, price_from: 250 },
        { id: '2', users: { name: 'Makeup by Chloe', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnSgXwuz1KGEWeB-y9b6aNRpmfg5WEIWbfhvzmsBKNTaVSPln58Czbex2yGy8j5BT9YAXok2KeDnRuRW8HIf7uF4Y822p_5AAeaqRQbDiHSxHpEcvnZEqP2Ej1JDuELWac_zG1Q25bgPQibt3vMHthj55VppFULyySxOWBTGyiAZ1PT_hXcxAXrWxmo3360gfhws2b4uHhbIE6AualLYGIaG1gspqBRyT7rs9AB74k0TWAM27yfjp2naIb5_T70UXKE8BrtM8vfcZa' }, specialties: ['Editorial', 'Fashion'], location: 'Brooklyn', rating: 5.0, price_from: 300 },
        { id: '3', users: { name: 'Elena Rodriguez', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHwDDuEwEiP72n5Hhy0VTu06ywwpjTeVHzyzXyNFLRzSmwAUl5-vYFTjB675Bm9maAA8ydXBgfVbiXhva3BezcD0x5lrVdyZXRgmL49Ha_Eh1pN_Z7UEMQOVDJtFt2AQO27AH4FHbn4JlGZ2eADgCkYjgMRF78lpRyElYt7X08zNPziOLPZcCPC1IgXTsIFy5fMyGPdUEb1fCM7K5VmK3wOABJWWLpcppemnkmyliyu3TznXj1ACVNftcAkWjWZF6u9GlObDy6j_qs' }, specialties: ['Event Glam'], location: 'Manhattan', rating: 4.8, price_from: 180 },
        { id: '4', users: { name: 'Glamour Studio', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnxl2mHbsKH9IDREKVqPeQkW39Fg90Hqsp-o3n8nT6YVZnHqsAV4atbyv6OQacCXhTNy06a5HtZ3Ls1mEqGX0CyIWJiyQSeQoWAcZH3xdFJ4y-sT8GD3VXDCf_MBjkvXnsr8bDoudDe8a0CnaJqe_D-KxA2eLFYXJf3_UDZvtcbF4Z9blZOMf7oA6TXcZ-KcYZNMsfJQyK23zEumDSQwfum0cz9aNQ4aKfgS_MqBc4A68TCa2mvEZTZCqPF8dkqyUvRqRSk6BEFIUg' }, specialties: ['Full Team Available'], location: 'Queens', rating: 4.9, price_from: 200 },
    ]

    const artists = featuredArtists.length > 0 ? featuredArtists : placeholderArtists

    return (
        <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full">
                {/* Hero Section */}
                <div className="mb-12">
                    <div
                        className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-8 relative overflow-hidden shadow-xl"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWw8RfMRNIWQ95sPcvczDiL33WMAEGYhA4tdK3Rpd5DCK-4JNSfNBC-auFG5bF7gPp6zQ8fZnUiHDfBqwZlHyt-puEn0RSA7p8h0Jp2rVXrfFeFJNNlD9-prurZSLONVGTfu2gRhEvYsxN8LhygewNhAVnvyTyB0Fybu6vA_jhLHesr3bHpNt4MSB7hW41vQB4f7fwZO0Box8HTQe7tCy83SpqIkkyg5pihw6HWVlJVK2yAj3gfFDtFZ4LdbJA5VgP-AczJYU9wq5I")`,
                        }}
                    >
                        <div className="relative z-10 flex flex-col gap-4 text-center max-w-[800px]">
                            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.02em] drop-shadow-sm">
                                Find the Perfect Makeup Artist for Your Special Day
                            </h1>
                            <h2 className="text-white/90 text-lg md:text-xl font-medium leading-normal max-w-[600px] mx-auto drop-shadow-sm">
                                Book premium makeup artists for weddings, galas, and high-end events effortlessly.
                            </h2>
                        </div>
                        <div className="relative z-10 w-full max-w-[800px] mt-6">
                            <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-2xl p-2 gap-2 md:gap-0">
                                <div className="flex flex-1 items-center px-4 py-3 border-b md:border-b-0 md:border-r border-[#e7dadb]">
                                    <span className="material-symbols-outlined text-primary mr-3">location_on</span>
                                    <div className="flex flex-col w-full">
                                        <span className="text-xs font-bold text-text-main uppercase tracking-wider">Location</span>
                                        <input
                                            className="w-full text-sm font-medium text-text-main placeholder:text-text-muted focus:outline-none bg-transparent p-0 border-none focus:ring-0"
                                            placeholder="New York, NY"
                                            type="text"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center px-4 py-3 border-b md:border-b-0 md:border-r border-[#e7dadb]">
                                    <span className="material-symbols-outlined text-primary mr-3">calendar_month</span>
                                    <div className="flex flex-col w-full">
                                        <span className="text-xs font-bold text-text-main uppercase tracking-wider">Date</span>
                                        <input
                                            className="w-full text-sm font-medium text-text-main placeholder:text-text-muted focus:outline-none bg-transparent p-0 border-none focus:ring-0"
                                            placeholder="Add dates"
                                            type="text"
                                            value={searchDate}
                                            onChange={(e) => setSearchDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center px-4 py-3">
                                    <span className="material-symbols-outlined text-primary mr-3">brush</span>
                                    <div className="flex flex-col w-full">
                                        <span className="text-xs font-bold text-text-main uppercase tracking-wider">Service</span>
                                        <input
                                            className="w-full text-sm font-medium text-text-main placeholder:text-text-muted focus:outline-none bg-transparent p-0 border-none focus:ring-0"
                                            placeholder="Bridal, Editorial..."
                                            type="text"
                                            value={searchService}
                                            onChange={(e) => setSearchService(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center p-1">
                                    <Link
                                        to="/browse"
                                        className="flex w-full md:w-auto min-w-[60px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark transition-colors text-white shadow-md"
                                    >
                                        <span className="material-symbols-outlined">search</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Artists Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-end mb-6 px-2">
                        <div>
                            <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight">Featured Artists</h2>
                            <p className="text-text-muted mt-2">Top-rated professionals for your next event</p>
                        </div>
                        <Link className="hidden sm:flex items-center text-primary font-bold hover:underline" to="/browse">
                            View all <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {artists.map((artist) => (
                            <Link
                                key={artist.id}
                                to={`/artists/${artist.id}`}
                                className="group flex flex-col bg-white rounded-xl shadow-sm border border-[#e7dadb] overflow-hidden hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                        <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                                        <span className="text-xs font-bold text-text-main">{artist.rating}</span>
                                    </div>
                                    <div
                                        className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url("${artist.users?.avatar_url || artist.portfolio_urls?.[0] || ''}")` }}
                                    ></div>
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-text-main">{artist.users?.name}</h3>
                                        <span className="material-symbols-outlined text-text-muted hover:text-primary cursor-pointer">favorite</span>
                                    </div>
                                    <p className="text-text-muted text-sm">
                                        {artist.specialties?.[0] || 'Makeup Artist'} • {artist.location || 'New York'}
                                    </p>
                                    <div className="mt-2 pt-3 border-t border-[#f5f0f0] flex justify-between items-center">
                                        <span className="text-xs font-semibold text-text-muted uppercase">Starting at</span>
                                        <span className="text-lg font-bold text-text-main">${artist.price_from || 200}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#e7dadb] mb-12">
                    <div className="flex flex-col gap-4 mb-10 text-center">
                        <h2 className="text-text-main tracking-tight text-3xl md:text-4xl font-extrabold leading-tight">
                            How it Works
                        </h2>
                        <p className="text-text-muted text-lg font-medium leading-normal max-w-[600px] mx-auto">
                            Booking your dream look is simple, transparent, and secure.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'search', title: '1. Search', desc: 'Browse portfolios, read verified reviews, and filter by your specific style and budget needs.' },
                            { icon: 'send', title: '2. Request', desc: 'Send a booking request with your event details directly to your favorite artists.' },
                            { icon: 'check_circle', title: '3. Approve', desc: 'Confirm your booking securely through our platform and get ready to shine.' },
                        ].map((step) => (
                            <div key={step.title} className="flex flex-col items-center text-center gap-4 group">
                                <div className="w-20 h-20 rounded-full bg-[#fff0f1] flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>{step.icon}</span>
                                </div>
                                <h3 className="text-text-main text-xl font-bold leading-tight">{step.title}</h3>
                                <p className="text-text-muted text-base leading-relaxed max-w-xs">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link
                            to={user ? '/browse' : '/signup'}
                            className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-base font-bold leading-normal shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
