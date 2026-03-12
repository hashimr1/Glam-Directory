import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OnboardingStep1() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ location: '', bio: '' })

    const handleNext = () => {
        sessionStorage.setItem('onboarding', JSON.stringify(formData))
        navigate('/onboarding/2')
    }

    return (
        <div className="flex-1 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-xl flex flex-col gap-8">
                <div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Step 1 of 4</span>
                    <h1 className="text-3xl font-extrabold text-text-main mt-2">Tell us about yourself</h1>
                    <p className="text-text-muted mt-2">Let clients know where you're based and a little about your work.</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4"><div className="bg-primary h-2 rounded-full w-1/4"></div></div>
                </div>
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleNext() }}>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold">Location</span>
                        <input className="w-full rounded-lg border-slate-200 bg-white h-12 px-4 focus:border-primary focus:ring-primary" placeholder="e.g. New York, NY" required type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold">Bio</span>
                        <textarea className="w-full rounded-lg border-slate-200 bg-white px-4 py-3 focus:border-primary focus:ring-primary resize-none" placeholder="Tell potential clients about your experience, style, and approach..." required rows="5" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}></textarea>
                    </label>
                    <button type="submit" className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                        Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
