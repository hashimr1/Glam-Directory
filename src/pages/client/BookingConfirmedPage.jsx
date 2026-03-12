import { Link, useParams } from 'react-router-dom'

export default function BookingConfirmedPage() {
    const { bookingId } = useParams()

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-lg">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-green-600 !text-[48px]">check_circle</span>
                </div>
                <h1 className="text-4xl font-extrabold text-text-main mb-4">Booking Confirmed!</h1>
                <p className="text-text-muted text-lg mb-2">Your booking has been confirmed. The artist will be in touch with you soon.</p>
                <p className="text-text-muted text-sm mb-8">Booking ID: {bookingId}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/bookings" className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-colors">
                        View My Bookings
                    </Link>
                    <Link to="/browse" className="px-8 py-3 border border-slate-300 text-text-main font-bold rounded-lg hover:bg-slate-50 transition-colors">
                        Browse More Artists
                    </Link>
                </div>
            </div>
        </div>
    )
}
