import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const placeholderArtist = {
    id: '1',
    location: 'New York, NY',
    bio: "Hi, I'm Sarah! With over 8 years of experience in the beauty industry, I specialize in creating timeless, radiant looks for brides and editorial campaigns. My philosophy is to enhance natural beauty rather than mask it. I believe every face tells a story, and my job is to help you tell yours with confidence and grace.\n\nBased in New York City, I have had the privilege of working with hundreds of brides and have been featured in top wedding publications. I use only premium, long-lasting products to ensure you look flawless from the first photo to the last dance.",
    specialties: ['Bridal', 'Editorial', 'Event Glam'],
    portfolio_urls: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFPTrauxNrORlhbpAcg1jhULOA-dh3q0yTeyFb8351IBIbVAGBTgbr2h1-JwY2ARWOh146FDyc7FOtZFdKQ-9tz4egKSpVuaEmABVzdT3RTPdOcD48XkqljITsSbZpuPj3Wzkb9zP-VhGz3xwhyfxoj3UxmTA8VvKb06vf5ueQwm0KudlAgYhWzQd_-kZUPM5T9xynjx56wNCrjkidEQgcqbrBHbKIYxSRo80nldqhQQUiuUakbxOZdGLELgwHUUw5ffNctX9d7VQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB6VkWyI5JvpWhGRbbICST-FjO71Z2_xf86eFwOZlOYJK18ih02WUJPDYEIecEKc4EcUViznzBi2lapKdHD1VLQuHqkyrMpF40O5cGOIl5NtnWThPAID-zMAZHsQ-LUqY9y48WRjoIQMThu7EdmJU-9cNhls2A4JdWYAPEJFYEiPrrhSV6d_wgYv0bCqR8ovxDvuQ_Q2Hp37tpMKzR-9MBJmJeh8FzapLOwNEqtsc0s7Aav4PdVuClv7zxvtMYuMfKsmuP_RuDuZMzK',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC0euw7PDzI193FpmqPmKRrMmsbboDeFzieXVJoCG1eeP31uzg7gWHOVAwe9jpb8M_6jnh9TEInnfH_gSqUzWa7ZqY9iut-Dp1muMq6koDJGCJEKyZN6RQeYIFklg3Nh30iacgoaxdygMM-ITNoG3Y8zw2A8zPSlUNDf3JeKMW4n3X4cL-iCe3PJCBqm_iZCvh4FxW2JZqBbL4Chefq27hKB7V3MQyAtxMrxVYEZjOBG3uRrLXlGucd0bFbfwhps6Dm5ZtwgtC44sec',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC8yMXJJrRGcYJeynsfgqvH7kAo9iEG7BagHNLHhPWa6MciZUOHaCmXaOr_uvYAbVW8SP9gkz7epHw8231ftIGR-B8FNCldHRuVVDOia_N0KziYw0Nueu7aMN2VM7qOiJ33RUi75zezGaFJopSarFyda5gUibCMMPBq7MMPRUxA2hKZK2aOLLUwnuh6jslkX6_PfXlqhqGdTG_3ZSrFTH5XCuQdxrOk8IuLctijcGwmfeyY5myMmKo1Ysg1TvpsNi_1jyV8wWAST6q3',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAIof3vuntwuAfee-mfoApwFgmMLivU1TU0pYs4wqtrvkgZjZz-sm9uElc0Prz3vkIPTy_iMRcQcaCuQyenG75oT6BE2CrfMTDCiz0QrzVye-pxVtK5xQw_2p9q201tGky9hj_uWpFITBbbkC0py2mjgTgCVI_drMf8Q_GeNXMdIZDIWAzCff1ME5WX50z0BA7N30lUDDxpPwHKekDqiAzA0iOvYEg0SOMqOtbD3vJ_M2xcBFY1juFfa-wPePS78o0mDTxTq_HoBsBq',
    ],
    rating: 5.0,
    review_count: 128,
    price_from: 150,
    users: {
        name: 'Sarah Jenkins',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwjsGtEizCwm3rg3VKRrZ36UbnUMK745NS1xYyUCak_Tn19XIo7XfGXWhMpQBDzITtxaoqzq74L2Y_Ddiq1m5gUvBaf5wWmz7p4HYrC-sv1uIluB1mtB2ld8rOdMrznbRiyrq8Pj6Ic7jppriX6Hm7mbhXcyJw8isZ5vA-CY4Qf--0Pe0j5a3UAwv9clQlQvoUS1kfgBpP17VOkYns7DhWO2OahkMFYgmcNARZaWVAwJal5fPCxoDlvRWx0slBGhHBCGRp36lRfFSg',
    },
}

const placeholderServices = [
    { id: 's1', name: 'Bridal Trial', price: 150, duration_minutes: 90, desc: 'In Studio session to perfect your look before the big day.' },
    { id: 's2', name: 'Wedding Day Makeup', price: 300, duration_minutes: 120, desc: 'On Location full glam including lashes and touch-up kit.', popular: true },
    { id: 's3', name: 'Bridal Party', price: 120, duration_minutes: 45, desc: 'Per Person for bridesmaids, mother of the bride/groom.' },
    { id: 's4', name: 'Event Glam', price: 100, duration_minutes: 60, desc: 'In Studio makeup for galas, proms, or special nights out.' },
]

const placeholderReviews = [
    { id: 'r1', client_name: 'Jessica M.', text: "Sarah was absolutely incredible! She listened to exactly what I wanted for my wedding day and executed it perfectly. My makeup lasted all night through dancing and tears. Highly recommend!", rating: 5, service: 'Wedding Day Makeup', time: '2 weeks ago', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB89jsxH2OHDGZFfqmvYsfKEUUw08ZJ4Pc1YUXMWxrQgtyRCvSqUFucY9Loc7Fd41-av9rsP3MtPdfaIRruQipXMcq6TJWpvtMdM2qjrXW7qBPIJEw8CevcEhpsC3MZXnGSjox8YKVN9cXySgfGGPCMtuZXNUrDHVDvIAgokShXftjTvoLwCLa_qjXZnoTKfAB3erToU9mVdkCmLRuy5AQm0HA-XqTC6HhTrfSp8t-H1jDAbQqKXpW_6Gc-Zm5nU7hztrqvuOJlJtet' },
    { id: 'r2', client_name: 'Alex R.', text: 'Professional, punctual, and extremely talented. The look was exactly on brief for our magazine shoot.', rating: 5, service: 'Editorial Shoot', time: '1 month ago', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhRZUP64jqXjNvm4ybcdJUEIU3hSDqQbm_RX9ou4RD_DmUz_VmvMeOAZImFS1ex2pyHU3qNSnU_JXt8llr1O8ED68KOX1hAIDRgFDHS38TXlGdZvDeiLYdty_4DuaTlTH3gibVs7kdgV9U0XlvtlbxqSTF2nBTJmII5_4CpsvgwBQKW6aa5dB0CgbKHyXpZUSd_iTNjEtUx9ndMFPubekhfPeX4FVh6QktSzXUu8xQM_mouIyRg2Rw3wrparjOYvOG68bbh8b1tTlE' },
]

export default function ArtistProfilePage() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [artist, setArtist] = useState(null)
    const [services, setServices] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('portfolio')

    useEffect(() => {
        fetchArtistData()
    }, [id])

    const fetchArtistData = async () => {
        try {
            const { data: artistData } = await supabase
                .from('artists')
                .select('*, users!inner(name, avatar_url)')
                .eq('id', id)
                .single()

            if (artistData) {
                setArtist(artistData)
                const { data: servicesData } = await supabase.from('services').select('*').eq('artist_id', id)
                if (servicesData) setServices(servicesData)
                const { data: reviewsData } = await supabase
                    .from('reviews')
                    .select('*, users!client_id(name, avatar_url)')
                    .eq('artist_id', id)
                if (reviewsData) setReviews(reviewsData)
            } else {
                setArtist(placeholderArtist)
                setServices(placeholderServices)
                setReviews(placeholderReviews)
            }
        } catch {
            setArtist(placeholderArtist)
            setServices(placeholderServices)
            setReviews(placeholderReviews)
        } finally {
            setLoading(false)
        }
    }

    const handleBooking = () => {
        if (!user) return navigate('/login')
        navigate(`/booking/request/${id}/1`)
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const displayArtist = artist || placeholderArtist
    const displayServices = services.length > 0 ? services : placeholderServices
    const displayReviews = reviews.length > 0 ? reviews : placeholderReviews
    const portfolioImages = displayArtist.portfolio_urls || placeholderArtist.portfolio_urls
    const portfolioLabels = ['Natural Bridal Glam', 'Editorial Shoot', 'Avant-Garde Eyes', 'Wedding Party', 'Product Selection']

    return (
        <div className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Artist Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="relative group cursor-pointer shrink-0">
                    <div
                        className="size-32 md:size-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-cover bg-center"
                        style={{ backgroundImage: `url('${displayArtist.users?.avatar_url}')` }}
                    ></div>
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white flex items-center justify-center" title="Verified Artist">
                        <span className="material-symbols-outlined !text-[16px]">verified</span>
                    </div>
                </div>
                <div className="flex-1 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2">{displayArtist.users?.name}</h1>
                            <p className="text-text-muted text-lg mb-3">{displayArtist.specialties?.join(' & ')} Makeup Artist</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-main">
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                                    <span className="material-symbols-outlined text-primary !text-[18px] fill-current">star</span>
                                    <span>{displayArtist.rating} <span className="text-text-muted font-normal">({displayArtist.review_count} reviews)</span></span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                                    <span className="material-symbols-outlined text-text-muted !text-[18px]">location_on</span>
                                    <span>{displayArtist.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center size-10 rounded-full bg-white border border-[#e7dadb] text-text-main hover:bg-background-light transition-colors">
                                <span className="material-symbols-outlined !text-[20px]">favorite</span>
                            </button>
                            <button className="flex items-center justify-center size-10 rounded-full bg-white border border-[#e7dadb] text-text-main hover:bg-background-light transition-colors">
                                <span className="material-symbols-outlined !text-[20px]">share</span>
                            </button>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center gap-8 border-b border-[#e7dadb] mt-8 overflow-x-auto">
                        {['portfolio', 'services', 'about', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 border-b-2 text-sm whitespace-nowrap transition-colors ${activeTab === tab ? 'border-primary text-text-main font-bold' : 'border-transparent hover:border-text-muted/30 text-text-muted font-medium'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
                <div className="lg:col-span-8 flex flex-col gap-12">
                    {/* Portfolio */}
                    {(activeTab === 'portfolio' || activeTab === 'about' || activeTab === 'services' || activeTab === 'reviews') && (
                        <section id="portfolio">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-text-main">Portfolio</h3>
                            </div>
                            <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                                {portfolioImages.map((url, i) => (
                                    <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in">
                                        <img alt={portfolioLabels[i] || 'Portfolio'} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" src={url} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <p className="text-white font-medium text-sm">{portfolioLabels[i] || 'Portfolio'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* About */}
                    <section id="about" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e7dadb]">
                        <h3 className="text-2xl font-bold text-text-main mb-4">About the Artist</h3>
                        <div className="prose max-w-none text-text-muted">
                            {displayArtist.bio?.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                        </div>
                    </section>

                    {/* Services */}
                    <section id="services" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e7dadb]">
                        <h3 className="text-2xl font-bold text-text-main mb-6">Services & Pricing</h3>
                        <div className="space-y-6">
                            {displayServices.map((service) => (
                                <div key={service.id} className="flex flex-col sm:flex-row gap-5 border-b border-[#f0e6e6] pb-6 last:border-0 last:pb-0">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-1 w-full gap-4 sm:gap-0">
                                        <div className="pr-0 sm:pr-4">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-text-main text-lg">{service.name}</h4>
                                                {service.popular && (
                                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
                                                )}
                                            </div>
                                            <p className="text-text-muted text-sm mt-1">
                                                {service.duration_minutes} mins{service.desc ? ` • ${service.desc}` : ''}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="font-bold text-primary text-lg">${service.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews */}
                    <section id="reviews" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e7dadb]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-text-main">Verified Reviews</h3>
                                <p className="text-text-muted mt-1">From clients who booked through Glam Directory</p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="text-3xl font-bold text-text-main">{displayArtist.rating}</div>
                                <div className="flex text-primary text-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined fill-current !text-[18px]">star</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            {displayReviews.map((review) => (
                                <div key={review.id} className="border-b border-[#f0e6e6] pb-8 last:border-0 last:pb-0">
                                    <div className="flex gap-4">
                                        <div
                                            className="size-12 rounded-full bg-slate-200 flex-shrink-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${review.avatar || review.users?.avatar_url || ''}')` }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-text-main">{review.client_name || review.users?.name}</h4>
                                                    <p className="text-xs text-text-muted">Booked: {review.service || 'Service'}</p>
                                                </div>
                                                <span className="text-xs text-text-muted">{review.time || 'Recently'}</span>
                                            </div>
                                            <div className="flex text-primary mb-2">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <span key={i} className="material-symbols-outlined fill-current !text-[16px]">star</span>
                                                ))}
                                            </div>
                                            <p className="text-text-main/80 text-sm leading-relaxed">{review.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24 flex flex-col gap-6">
                        {/* Booking Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-[#e7dadb] p-6">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-2xl font-bold text-text-main">${displayArtist.price_from}+</span>
                                    <span className="text-text-muted text-sm"> / session</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-text-main">
                                    <span className="material-symbols-outlined text-primary !text-[16px] fill-current">star</span>
                                    <span>{displayArtist.rating}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleBooking}
                                className="w-full bg-primary text-white text-lg font-bold py-3.5 rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-md"
                            >
                                Request Booking
                            </button>
                            <div className="mt-4 text-center">
                                <span className="text-xs text-text-muted">You won't be charged yet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
