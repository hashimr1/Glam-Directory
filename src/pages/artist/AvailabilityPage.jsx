import { useState } from 'react'

export default function AvailabilityPage() {
    const [selectedDates, setSelectedDates] = useState([])
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const [viewMonth, setViewMonth] = useState(currentMonth)
    const [viewYear, setViewYear] = useState(currentYear)

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
    const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' })

    const toggleDate = (day) => {
        const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        setSelectedDates((prev) => prev.includes(dateStr) ? prev.filter((d) => d !== dateStr) : [...prev, dateStr])
    }

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
        else setViewMonth(viewMonth - 1)
    }
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
        else setViewMonth(viewMonth + 1)
    }

    return (
        <div className="flex-1 w-full max-w-[800px] mx-auto px-4 py-10 md:px-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">Manage Availability</h1>
                <p className="text-text-muted text-lg">Click on dates to toggle your availability. Highlighted dates are available for bookings.</p>
            </div>

            <div className="bg-white rounded-2xl border border-border-neutral shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h2 className="text-xl font-bold text-text-main">{monthName} {viewYear}</h2>
                    <button onClick={nextMonth} className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div key={d} className="text-center text-xs font-bold text-text-muted uppercase tracking-wider py-2">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {[...Array(firstDayOfMonth)].map((_, i) => <div key={`e-${i}`}></div>)}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1
                        const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        const isSelected = selectedDates.includes(dateStr)
                        const isToday = day === today.getDate() && viewMonth === currentMonth && viewYear === currentYear
                        return (
                            <button key={day} onClick={() => toggleDate(day)}
                                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${isSelected ? 'bg-primary text-white shadow-md' : 'hover:bg-slate-100'} ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            >
                                {day}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2"><div className="size-4 rounded bg-primary"></div><span className="text-sm text-text-muted">Available</span></div>
                    <div className="flex items-center gap-2"><div className="size-4 rounded bg-slate-100 border border-slate-200"></div><span className="text-sm text-text-muted">Unavailable</span></div>
                </div>
                <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-colors text-sm">Save Changes</button>
            </div>
        </div>
    )
}
