import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const allSpecialties = ['Bridal', 'Editorial', 'Event Glam', 'Prom / Formal', 'SFX', 'Avant-Garde', 'Natural / Clean', 'Mature Skin', 'Airbrush', 'Melanin-Rich Specialty']

export default function OnboardingStep3() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])

    const toggle = (spec) => {
        setSelected((prev) => prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec])
    }

    const handleNext = () => {
        const prev = JSON.parse(sessionStorage.getItem('onboarding') || '{}')
        sessionStorage.setItem('onboarding', JSON.stringify({ ...prev, specialties: selected }))
        navigate('/onboarding/4')
    }

    return (
        <div className="flex-1 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-xl flex flex-col gap-8">
                <div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Step 3 of 4</span>
                    <h1 className="text-3xl font-extrabold text-text-main mt-2">Your specialties</h1>
                    <p className="text-text-muted mt-2">Select all the areas you specialize in.</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4"><div className="bg-primary h-2 rounded-full w-3/4"></div></div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {allSpecialties.map((spec) => (
                        <button key={spec} onClick={() => toggle(spec)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${selected.includes(spec) ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-text-main border-slate-200 hover:border-primary hover:text-primary'}`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-4">
                    <Link to="/onboarding/2" className="text-text-muted font-bold text-sm hover:underline">Back</Link>
                    <button onClick={handleNext} disabled={selected.length === 0} className="px-8 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
                        Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
