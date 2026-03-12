import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function OnboardingStep2() {
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([])

    const handleNext = () => {
        const prev = JSON.parse(sessionStorage.getItem('onboarding') || '{}')
        sessionStorage.setItem('onboarding', JSON.stringify({ ...prev, hasPortfolio: photos.length > 0 }))
        navigate('/onboarding/3')
    }

    return (
        <div className="flex-1 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-xl flex flex-col gap-8">
                <div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Step 2 of 4</span>
                    <h1 className="text-3xl font-extrabold text-text-main mt-2">Upload your portfolio</h1>
                    <p className="text-text-muted mt-2">Show off your best work. You can add more photos later.</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4"><div className="bg-primary h-2 rounded-full w-2/4"></div></div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined !text-[32px]">add_photo_alternate</span>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold mb-1">Upload Portfolio Photos</p>
                        <p className="text-sm text-slate-500">Drag and drop, or click to select. Upload at least 3 photos.</p>
                    </div>
                    <input type="file" accept="image/*" multiple className="hidden" id="portfolio-upload" onChange={(e) => setPhotos([...e.target.files])} />
                    <label htmlFor="portfolio-upload" className="bg-white border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-shadow cursor-pointer">
                        Choose Files
                    </label>
                    {photos.length > 0 && <p className="text-sm text-green-600 font-medium">{photos.length} files selected</p>}
                </div>
                <div className="flex justify-between items-center pt-4">
                    <Link to="/onboarding/1" className="text-text-muted font-bold text-sm hover:underline">Back</Link>
                    <button onClick={handleNext} className="px-8 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2">
                        Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
