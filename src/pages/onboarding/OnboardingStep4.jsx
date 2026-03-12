import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function OnboardingStep4() {
    const navigate = useNavigate()
    const { user, fetchUserProfile } = useAuth()
    const [services, setServices] = useState([{ name: '', price: '' }])
    const [submitting, setSubmitting] = useState(false)

    const addService = () => setServices([...services, { name: '', price: '' }])
    const updateService = (i, field, value) => {
        const updated = [...services]
        updated[i][field] = value
        setServices(updated)
    }
    const removeService = (i) => setServices(services.filter((_, idx) => idx !== i))

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const onboarding = JSON.parse(sessionStorage.getItem('onboarding') || '{}')
            const validServices = services.filter((s) => s.name && s.price)
            const minPrice = validServices.length > 0 ? Math.min(...validServices.map((s) => parseFloat(s.price))) : 0

            // Create artist profile
            const { error: artistError } = await supabase.from('artists').insert({
                id: user.id,
                location: onboarding.location || '',
                bio: onboarding.bio || '',
                specialties: onboarding.specialties || [],
                portfolio_urls: [],
                price_from: minPrice,
            })
            if (artistError) throw artistError

            // Create services
            if (validServices.length > 0) {
                await supabase.from('services').insert(validServices.map((s) => ({
                    artist_id: user.id,
                    name: s.name,
                    price: parseFloat(s.price),
                    duration_minutes: 60,
                })))
            }

            // Upgrade user type
            await supabase.from('users').update({ type: 'artist', has_completed_onboarding: true }).eq('id', user.id)

            sessionStorage.removeItem('onboarding')
            await fetchUserProfile(user.id)
            navigate('/dashboard/bookings')
        } catch (err) {
            console.error(err)
            alert('Failed to complete setup. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex-1 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-xl flex flex-col gap-8">
                <div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Step 4 of 4</span>
                    <h1 className="text-3xl font-extrabold text-text-main mt-2">Services & Pricing</h1>
                    <p className="text-text-muted mt-2">Add the services you offer and your pricing. You can always edit these later.</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4"><div className="bg-primary h-2 rounded-full w-full"></div></div>
                </div>

                <div className="flex flex-col gap-4">
                    {services.map((service, i) => (
                        <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex-1 flex flex-col gap-3">
                                <input className="w-full rounded-lg border-slate-200 bg-background-light h-11 px-4 text-sm focus:border-primary focus:ring-primary" placeholder="Service name (e.g. Bridal Makeup)" value={service.name} onChange={(e) => updateService(i, 'name', e.target.value)} />
                                <input className="w-full rounded-lg border-slate-200 bg-background-light h-11 px-4 text-sm focus:border-primary focus:ring-primary" placeholder="Price ($)" type="number" value={service.price} onChange={(e) => updateService(i, 'price', e.target.value)} />
                            </div>
                            {services.length > 1 && (
                                <button onClick={() => removeService(i)} className="size-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors mt-1">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={addService} className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-text-muted font-bold text-sm hover:border-primary hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">add</span> Add service
                    </button>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <Link to="/onboarding/3" className="text-text-muted font-bold text-sm hover:underline">Back</Link>
                    <button onClick={handleSubmit} disabled={submitting} className="px-8 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-colors disabled:opacity-50">
                        {submitting ? 'Completing Setup...' : 'Complete Setup'}
                    </button>
                </div>
            </div>
        </div>
    )
}
