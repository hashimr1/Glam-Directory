import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function BookingStep1() {
    const { artistId } = useParams()
    const navigate = useNavigate()
    const [artist, setArtist] = useState(null)
    const [services, setServices] = useState([])
    const [formData, setFormData] = useState({ date: '', time: '', location: '', services: {} })

    useEffect(() => {
        fetchArtist()
    }, [artistId])

    const fetchArtist = async () => {
        const { data } = await supabase.from('artists').select('*, users(name, avatar_url)').eq('id', artistId).single()
        if (data) {
            setArtist(data)
            const { data: svc } = await supabase.from('services').select('*').eq('artist_id', artistId)
            if (svc) setServices(svc)
        }
    }

    const updateServiceQty = (serviceId, delta) => {
        setFormData((prev) => ({
            ...prev,
            services: { ...prev.services, [serviceId]: Math.max(0, (prev.services[serviceId] || 0) + delta) },
        }))
    }

    const handleNext = () => {
        sessionStorage.setItem('bookingStep1', JSON.stringify({ ...formData, artistId }))
        navigate(`/booking/request/${artistId}/2`)
    }

    return (
        <div className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F5F5' }}>
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col gap-6">
                    <Link to={`/artists/${artistId}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-2 w-fit">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>Back to artist profile
                    </Link>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-6 justify-between items-end mb-2">
                            <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
                            <span className="text-sm font-medium text-slate-500">Step 1 of 3</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-1/3 rounded-full"></div>
                        </div>
                    </div>
                    <form className="flex flex-col gap-8 mt-4" onSubmit={(e) => { e.preventDefault(); handleNext() }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-base font-medium">Event Date</span>
                                <input className="w-full rounded-lg border-slate-200 bg-white h-12 px-4 text-base focus:border-primary focus:ring-primary shadow-sm" required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-base font-medium">Ready-by Time</span>
                                <input className="w-full rounded-lg border-slate-200 bg-white h-12 px-4 text-base focus:border-primary focus:ring-primary shadow-sm" required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                            </label>
                        </div>
                        <label className="flex flex-col gap-2">
                            <span className="text-base font-medium">Venue Address</span>
                            <div className="relative">
                                <input className="w-full rounded-lg border-slate-200 bg-white h-12 px-4 pr-10 text-base focus:border-primary focus:ring-primary shadow-sm placeholder:text-slate-400" placeholder="Enter street address, city, state" required type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">location_on</span>
                            </div>
                        </label>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold">Services Required</h3>
                            <p className="text-sm text-slate-500 -mt-2 mb-2">Select the number of people for each service.</p>
                            {services.map((service) => (
                                <div key={service.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                                    <div>
                                        <h4 className="font-bold text-base">{service.name}</h4>
                                        <p className="text-sm text-slate-500">${service.price} • {service.duration_minutes} mins</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button type="button" onClick={() => updateServiceQty(service.id, -1)} className="size-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                                            <span className="material-symbols-outlined text-sm">remove</span>
                                        </button>
                                        <span className="w-4 text-center font-medium">{formData.services[service.id] || 0}</span>
                                        <button type="button" onClick={() => updateServiceQty(service.id, 1)} className="size-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {services.length === 0 && <p className="text-text-muted text-sm italic">No services available. The artist will provide a custom quote.</p>}
                        </div>
                        <div className="pt-8 flex items-center justify-between border-t border-slate-200">
                            <Link to={`/artists/${artistId}`} className="text-text-muted hover:text-text-main font-medium transition-colors">Back</Link>
                            <button type="submit" className="px-8 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2">
                                Next Step <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>
                {/* Sidebar */}
                <div className="lg:w-[380px] shrink-0">
                    <div className="sticky top-24 border border-border-neutral rounded-xl bg-white shadow-lg p-6 flex flex-col gap-6">
                        <div className="flex gap-4 items-center">
                            <div className="size-16 rounded-full overflow-hidden bg-slate-200">
                                {artist?.users?.avatar_url && <img alt={artist.users.name} className="w-full h-full object-cover" src={artist.users.avatar_url} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Artist</span>
                                <h3 className="font-bold text-lg leading-tight">{artist?.users?.name || 'Loading...'}</h3>
                            </div>
                        </div>
                        <div className="h-px bg-slate-200 w-full"></div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-base">Booking Summary</h4>
                            {formData.date && <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Date</span><span className="font-medium">{formData.date}</span></div>}
                            {formData.time && <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Time</span><span className="font-medium">{formData.time}</span></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
