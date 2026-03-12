import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const statusConfig = {
    pending: { label: 'Awaiting Quote', class: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'hourglass_empty' },
    quoted: { label: 'Quote Ready', class: 'bg-primary/10 text-primary border-primary/20', icon: 'gavel' },
    confirmed: { label: 'Confirmed', class: 'bg-green-100 text-green-800 border-green-200', icon: 'check_circle' },
    declined: { label: 'Declined', class: 'bg-red-100 text-red-800 border-red-200', icon: 'cancel' },
    completed: { label: 'Completed', class: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'task_alt' },
}

export default function ClientBookingsPage() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('action')

    useEffect(() => {
        if (user) fetchBookings()
    }, [user])

    const fetchBookings = async () => {
        try {
            const { data } = await supabase
                .from('bookings')
                .select('*, artists(users(name, avatar_url))')
                .eq('client_id', user.id)
                .order('created_at', { ascending: false })
            if (data) setBookings(data)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const filteredBookings = bookings.filter((b) => {
        if (activeTab === 'action') return b.status === 'quoted' || b.status === 'pending'
        if (activeTab === 'upcoming') return b.status === 'confirmed'
        return b.status === 'completed' || b.status === 'declined'
    })

    return (
        <div className="flex-1 w-full max-w-[960px] mx-auto px-4 py-10 md:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">My Bookings</h1>
                <p className="text-text-muted text-lg">Manage your upcoming beauty appointments and quotes.</p>
            </div>
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                {[['action', 'gavel', 'Action Needed'], ['upcoming', 'calendar_month', 'Upcoming'], ['past', 'history', 'Past']].map(([key, icon, label]) => (
                    <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-2 px-1 pb-4 border-b-2 font-bold text-sm whitespace-nowrap mr-8 transition-colors ${activeTab === key ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        <span className="material-symbols-outlined text-[18px]">{icon}</span>{label}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-20 text-text-muted">
                    <span className="material-symbols-outlined !text-[48px] mb-4">event_busy</span>
                    <p className="text-lg font-medium">No bookings in this category</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {filteredBookings.map((booking) => {
                        const cfg = statusConfig[booking.status] || statusConfig.pending
                        return (
                            <article key={booking.id} className="bg-white rounded-xl border border-border-neutral shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-text-main">{booking.artists?.users?.name || 'Artist'}</h3>
                                                <p className="text-text-muted font-medium">{booking.event_type || 'Event'}</p>
                                                <div className="flex items-center gap-1 text-slate-400 text-sm mt-2">
                                                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                                    <span>{booking.date}</span>
                                                </div>
                                                {booking.location && (
                                                    <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                                                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                        <span>{booking.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${cfg.class}`}>
                                                <span className="material-symbols-outlined text-[14px]">{cfg.icon}</span>{cfg.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-auto">
                                            {booking.status === 'quoted' ? (
                                                <Link to={`/booking/quote/${booking.id}`} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 flex items-center gap-2">
                                                    View Quote & Confirm <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                                </Link>
                                            ) : (
                                                <span className="text-sm text-slate-400">Waiting for artist response</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
