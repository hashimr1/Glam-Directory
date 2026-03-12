import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function BookingStep3() {
    const { artistId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [submitting, setSubmitting] = useState(false)
    const step1 = JSON.parse(sessionStorage.getItem('bookingStep1') || '{}')
    const step2 = JSON.parse(sessionStorage.getItem('bookingStep2') || '{}')

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const { data, error } = await supabase.from('bookings').insert({
                client_id: user.id,
                artist_id: artistId,
                date: step1.date,
                event_type: 'Wedding',
                location: step1.location,
                notes: step2.notes || '',
                status: 'pending',
            }).select().single()
            if (error) throw error
            sessionStorage.removeItem('bookingStep1')
            sessionStorage.removeItem('bookingStep2')
            navigate(`/booking/confirmed/${data.id}`)
        } catch (err) {
            console.error(err)
            alert('Failed to submit booking request. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-8 md:px-10 md:py-12">
            <div className="flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-6 justify-between items-end">
                            <h1 className="text-3xl font-bold tracking-tight">Review your request</h1>
                            <span className="text-sm font-medium text-slate-500">Step 3 of 3</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-slate-600 text-base leading-relaxed mt-2">Please review the details below. The artist will confirm availability within 24 hours.</p>
                    </div>
                    <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
                        <span className="material-symbols-outlined text-blue-600 shrink-0">info</span>
                        <div className="text-sm">
                            <p className="font-bold mb-1">Note: All payments are handled privately between you and the artist.</p>
                            <p className="opacity-90">Please arrange final payment details directly once your request is approved.</p>
                        </div>
                    </div>
                    <section className="border-t border-slate-200 pt-6">
                        <h3 className="text-xl font-bold mb-6">Event Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined">calendar_month</span></div>
                                <div><p className="text-sm text-slate-500 font-medium">Date</p><p className="font-semibold">{step1.date || 'Not set'}</p></div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined">schedule</span></div>
                                <div><p className="text-sm text-slate-500 font-medium">Time</p><p className="font-semibold">{step1.time || 'Not set'}</p></div>
                            </div>
                            <div className="flex gap-3 md:col-span-2">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined">location_on</span></div>
                                <div><p className="text-sm text-slate-500 font-medium">Location</p><p className="font-semibold">{step1.location || 'Not set'}</p></div>
                            </div>
                        </div>
                    </section>
                    {step2.notes && (
                        <section className="border-t border-slate-200 pt-6">
                            <h3 className="text-xl font-bold mb-4">Note to Artist</h3>
                            <p className="text-slate-600 italic">"{step2.notes}"</p>
                        </section>
                    )}
                    <div className="mt-4 pb-12 flex items-center justify-between border-t border-slate-200 pt-8">
                        <Link to={`/booking/request/${artistId}/2`} className="text-text-muted hover:text-text-main font-medium text-lg transition-colors">Back</Link>
                        <button onClick={handleSubmit} disabled={submitting} className="bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-12 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50">
                            {submitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
