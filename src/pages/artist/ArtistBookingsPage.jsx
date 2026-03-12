import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const statusConfig = {
    pending: { label: 'New Request', class: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'notifications_active' },
    quoted: { label: 'Quote Sent', class: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'send' },
    confirmed: { label: 'Confirmed', class: 'bg-green-100 text-green-800 border-green-200', icon: 'check_circle' },
    declined: { label: 'Declined', class: 'bg-red-100 text-red-800 border-red-200', icon: 'cancel' },
    completed: { label: 'Completed', class: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'task_alt' },
}

export default function ArtistBookingsPage() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('new')

    useEffect(() => {
        if (user) fetchBookings()
    }, [user])

    const fetchBookings = async () => {
        try {
            const { data } = await supabase
                .from('bookings')
                .select('*, users!client_id(name, avatar_url)')
                .eq('artist_id', user.id)
                .order('created_at', { ascending: false })
            if (data) setBookings(data)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const filtered = bookings.filter((b) => {
        if (activeTab === 'new') return b.status === 'pending'
        if (activeTab === 'active') return b.status === 'quoted' || b.status === 'confirmed'
        return b.status === 'completed' || b.status === 'declined'
    })

    return (
        <div className="flex-1 w-full max-w-[960px] mx-auto px-4 py-10 md:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">Manage Bookings</h1>
                <p className="text-text-muted text-lg">Review new requests and manage your appointments.</p>
            </div>
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                {[['new', 'notifications_active', 'New Requests'], ['active', 'calendar_month', 'Active'], ['past', 'history', 'Past']].map(([key, icon, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-2 px-1 pb-4 border-b-2 font-bold text-sm whitespace-nowrap mr-8 transition-colors ${activeTab === key ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        <span className="material-symbols-outlined text-[18px]">{icon}</span>{label}
                        {key === 'new' && bookings.filter(b => b.status === 'pending').length > 0 && (
                            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">{bookings.filter(b => b.status === 'pending').length}</span>
                        )}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-text-muted">
                    <span className="material-symbols-outlined !text-[48px] mb-4">event_available</span>
                    <p className="text-lg font-medium">No bookings yet</p>
                    <p className="text-sm mt-1">New booking requests will appear here.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {filtered.map((booking) => {
                        const cfg = statusConfig[booking.status] || statusConfig.pending
                        return (
                            <article key={booking.id} className="bg-white rounded-xl border border-border-neutral shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-full bg-slate-200 overflow-hidden">
                                            {booking.users?.avatar_url && <img src={booking.users.avatar_url} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-text-main">{booking.users?.name || 'Client'}</h3>
                                            <p className="text-text-muted text-sm">{booking.event_type || 'Event'} • {booking.date}</p>
                                            {booking.location && <p className="text-text-muted text-sm flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{booking.location}</p>}
                                        </div>
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${cfg.class}`}>
                                        <span className="material-symbols-outlined text-[14px]">{cfg.icon}</span>{cfg.label}
                                    </div>
                                </div>
                                {booking.notes && <p className="text-text-muted text-sm italic mb-4">"{booking.notes}"</p>}
                                <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                                    {booking.status === 'pending' && (
                                        <Link to={`/dashboard/quote/${booking.id}`} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 flex items-center gap-2">
                                            Send Quote <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    )}
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
