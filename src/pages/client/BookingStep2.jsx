import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function BookingStep2() {
    const { artistId } = useParams()
    const navigate = useNavigate()
    const [skinType, setSkinType] = useState('')
    const [notes, setNotes] = useState('')

    const handleNext = () => {
        const prev = JSON.parse(sessionStorage.getItem('bookingStep1') || '{}')
        sessionStorage.setItem('bookingStep2', JSON.stringify({ ...prev, skinType, notes }))
        navigate(`/booking/request/${artistId}/3`)
    }

    return (
        <div className="flex-grow w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:px-12 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                <div className="flex-1 w-full max-w-2xl">
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Step 2 of 3</span>
                                <h1 className="text-3xl font-bold">Details & Inspiration</h1>
                            </div>
                            <span className="text-sm font-medium text-slate-500">66% Completed</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '66%' }}></div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2">Tell us about your needs</h2>
                        <p className="text-slate-600">Help the artist understand your style, skin type, and specific requirements.</p>
                    </div>
                    <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleNext() }}>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-semibold">Skin Type</label>
                            <select className="w-full rounded-xl border border-slate-300 bg-white p-4 text-base focus:border-primary focus:ring-1 focus:ring-primary" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                                <option value="" disabled>Select your skin type</option>
                                <option value="oily">Oily</option>
                                <option value="dry">Dry</option>
                                <option value="combination">Combination</option>
                                <option value="normal">Normal</option>
                                <option value="sensitive">Sensitive</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-semibold">Inspiration Photos</label>
                            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-base font-bold mb-1">Upload Inspiration Photos</p>
                                    <p className="text-sm text-slate-500">Drag and drop photos here, or click to browse.</p>
                                </div>
                                <button type="button" className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-shadow">Choose Files</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-semibold">Additional Notes (Optional)</label>
                            <textarea className="w-full rounded-xl border border-slate-300 bg-white p-4 text-base focus:border-primary focus:ring-1 focus:ring-primary resize-none" placeholder="Anything else the artist should know? (e.g. allergies, specific looks to avoid)" rows="4" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                        <div className="flex items-center justify-between pt-6 mt-2">
                            <Link to={`/booking/request/${artistId}/1`} className="text-text-muted font-bold text-sm hover:underline">Back</Link>
                            <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3 rounded-lg shadow-lg shadow-primary/30 flex items-center gap-2">
                                Next Step <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
