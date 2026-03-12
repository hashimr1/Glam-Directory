import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function EditProfilePage() {
    const { user, userProfile, fetchUserProfile } = useAuth()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [formData, setFormData] = useState({ name: '', bio: '', location: '', specialties: [] })
    const [services, setServices] = useState([])

    useEffect(() => {
        if (user) fetchData()
    }, [user])

    const fetchData = async () => {
        try {
            const { data: artist } = await supabase.from('artists').select('*').eq('id', user.id).single()
            if (artist) {
                setFormData({ name: userProfile?.name || '', bio: artist.bio || '', location: artist.location || '', specialties: artist.specialties || [] })
            }
            const { data: svc } = await supabase.from('services').select('*').eq('artist_id', user.id)
            if (svc) setServices(svc)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await supabase.from('users').update({ name: formData.name }).eq('id', user.id)
            await supabase.from('artists').update({ bio: formData.bio, location: formData.location, specialties: formData.specialties }).eq('id', user.id)
            await fetchUserProfile(user.id)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (err) {
            console.error(err)
            alert('Failed to save changes.')
        } finally { setSaving(false) }
    }

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>

    return (
        <div className="flex-1 w-full max-w-[800px] mx-auto px-4 py-10 md:px-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">Edit Profile</h1>
                <p className="text-text-muted text-lg">Update your profile information, portfolio, and services.</p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Basic Info */}
                <section className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-main mb-6">Basic Information</h2>
                    <div className="flex flex-col gap-5">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-semibold">Display Name</span>
                            <input className="w-full rounded-lg border-slate-200 bg-background-light h-12 px-4 focus:border-primary focus:ring-primary" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-semibold">Location</span>
                            <input className="w-full rounded-lg border-slate-200 bg-background-light h-12 px-4 focus:border-primary focus:ring-primary" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-semibold">Bio</span>
                            <textarea className="w-full rounded-lg border-slate-200 bg-background-light px-4 py-3 focus:border-primary focus:ring-primary resize-none" rows="5" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}></textarea>
                        </label>
                    </div>
                </section>

                {/* Services */}
                <section className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-main mb-6">Your Services</h2>
                    {services.length === 0 ? (
                        <p className="text-text-muted text-sm">No services yet. Add services from the onboarding flow.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl">
                                    <div>
                                        <h4 className="font-bold">{service.name}</h4>
                                        <p className="text-sm text-text-muted">{service.duration_minutes} mins</p>
                                    </div>
                                    <span className="font-bold text-primary text-lg">${service.price}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Portfolio */}
                <section className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-main mb-6">Portfolio</h2>
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">add_photo_alternate</span>
                        </div>
                        <p className="text-sm text-slate-500">Click to upload new portfolio photos</p>
                    </div>
                </section>

                {/* Save Button */}
                <div className="flex justify-end gap-4 pt-4">
                    <button onClick={handleSave} disabled={saving} className={`px-8 py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-50 ${saved ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'}`}>
                        {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}
