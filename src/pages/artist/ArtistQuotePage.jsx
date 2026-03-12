import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ArtistQuotePage() {
    const { bookingId } = useParams()
    const navigate = useNavigate()
    const [booking, setBooking] = useState(null)
    const [items, setItems] = useState([{ name: '', price: '' }])
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => { fetchBooking() }, [bookingId])

    const fetchBooking = async () => {
        const { data } = await supabase.from('bookings').select('*, users!client_id(name, avatar_url)').eq('id', bookingId).single()
        if (data) setBooking(data)
    }

    const addItem = () => setItems([...items, { name: '', price: '' }])
    const updateItem = (i, field, value) => {
        const updated = [...items]
        updated[i][field] = value
        setItems(updated)
    }
    const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const validItems = items.filter((i) => i.name && i.price).map((i) => ({ name: i.name, price: parseFloat(i.price) }))
            await supabase.from('quotes').insert({ booking_id: bookingId, message, total, items: validItems })
            await supabase.from('bookings').update({ status: 'quoted' }).eq('id', bookingId)
            navigate('/dashboard/bookings')
        } catch (err) {
            console.error(err)
            alert('Failed to send quote.')
        } finally { setSubmitting(false) }
    }

    return (
        <div className="flex-1 w-full max-w-[800px] mx-auto px-4 py-10 md:px-8">
            <h1 className="text-3xl font-extrabold text-text-main mb-2">Send Quote</h1>
            <p className="text-text-muted mb-8">Review the booking request and send your quote to the client.</p>

            {booking && (
                <div className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-12 rounded-full bg-slate-200 overflow-hidden">
                            {booking.users?.avatar_url && <img src={booking.users.avatar_url} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{booking.users?.name}</h3>
                            <p className="text-text-muted text-sm">{booking.event_type} • {booking.date}</p>
                        </div>
                    </div>
                    {booking.notes && <p className="text-text-muted text-sm italic border-t border-slate-100 pt-4">"{booking.notes}"</p>}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Quote Line Items</h3>
                <div className="flex flex-col gap-3 mb-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <input className="flex-1 rounded-lg border-slate-200 bg-background-light h-11 px-4 text-sm focus:border-primary focus:ring-primary" placeholder="Item name" value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} />
                            <input className="w-28 rounded-lg border-slate-200 bg-background-light h-11 px-4 text-sm focus:border-primary focus:ring-primary" placeholder="$0.00" type="number" value={item.price} onChange={(e) => updateItem(i, 'price', e.target.value)} />
                            {items.length > 1 && (
                                <button onClick={() => removeItem(i)} className="size-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={addItem} className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                    <span className="material-symbols-outlined text-[18px]">add</span> Add item
                </button>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-200">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-extrabold text-primary">${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Message to Client (Optional)</label>
                <textarea className="w-full rounded-xl border border-slate-200 bg-white p-4 text-base focus:border-primary focus:ring-1 focus:ring-primary resize-none" placeholder="Add a personal message..." rows="3" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>

            <div className="flex justify-end gap-4">
                <button onClick={() => navigate('/dashboard/bookings')} className="px-8 py-3 rounded-lg border border-slate-300 text-text-main font-bold hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md shadow-primary/20 transition-colors disabled:opacity-50">
                    {submitting ? 'Sending...' : 'Send Quote'}
                </button>
            </div>
        </div>
    )
}
