import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function QuoteReviewPage() {
    const { bookingId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [booking, setBooking] = useState(null)
    const [quote, setQuote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => { fetchData() }, [bookingId])

    const fetchData = async () => {
        try {
            const { data: b } = await supabase.from('bookings').select('*, artists(users(name, avatar_url))').eq('id', bookingId).single()
            if (b) setBooking(b)
            const { data: q } = await supabase.from('quotes').select('*').eq('booking_id', bookingId).single()
            if (q) setQuote(q)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const handleAction = async (status) => {
        setActionLoading(true)
        try {
            await supabase.from('bookings').update({ status }).eq('id', bookingId)
            if (status === 'confirmed') navigate(`/booking/confirmed/${bookingId}`)
            else navigate('/bookings')
        } catch { alert('Failed to update booking') }
        finally { setActionLoading(false) }
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>

    return (
        <div className="flex-1 w-full max-w-[800px] mx-auto px-4 py-10 md:px-8">
            <h1 className="text-3xl font-extrabold text-text-main mb-2">Review Quote</h1>
            <p className="text-text-muted mb-8">Review the quote from {booking?.artists?.users?.name} and approve or decline.</p>

            <div className="bg-white rounded-2xl border border-border-neutral shadow-sm p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-full overflow-hidden bg-slate-200">
                        {booking?.artists?.users?.avatar_url && <img src={booking.artists.users.avatar_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{booking?.artists?.users?.name}</h3>
                        <p className="text-text-muted text-sm">{booking?.date} • {booking?.location}</p>
                    </div>
                </div>
                <hr className="border-slate-200 mb-6" />
                {quote?.message && <div className="bg-background-light rounded-lg p-4 mb-6"><p className="text-text-main italic">"{quote.message}"</p></div>}
                {quote?.items && (
                    <div className="mb-6">
                        <h4 className="font-bold text-lg mb-4">Quote Breakdown</h4>
                        <div className="space-y-3">
                            {quote.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                    <span className="text-text-main">{item.name}</span>
                                    <span className="font-bold">${item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-extrabold text-primary">${quote?.total || 0}</span>
                </div>
            </div>

            <div className="flex gap-4 justify-end">
                <button onClick={() => handleAction('declined')} disabled={actionLoading} className="px-8 py-3 rounded-lg border border-slate-300 text-text-main font-bold hover:bg-slate-50 transition-colors disabled:opacity-50">
                    Decline
                </button>
                <button onClick={() => handleAction('confirmed')} disabled={actionLoading} className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md shadow-primary/20 disabled:opacity-50">
                    {actionLoading ? 'Processing...' : 'Approve & Confirm'}
                </button>
            </div>
        </div>
    )
}
