import { Link, useLocation } from 'react-router-dom'

export default function UnauthenticatedNav() {
    const location = useLocation()

    // Pass the current page as backgroundLocation so auth modals overlay it
    const authState = { backgroundLocation: location }

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-border-neutral px-6 md:px-10 lg:px-20 py-4 bg-white sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">brush</span>
                </div>
                <h1 className="text-text-main text-xl font-extrabold leading-tight tracking-tight">
                    Glam Directory
                </h1>
            </Link>
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
                <Link
                    to="/login"
                    state={authState}
                    className="hidden sm:block px-4 py-2 text-text-main hover:text-primary text-sm font-bold transition-colors"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    state={authState}
                    className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-wide shadow-sm hover:opacity-90 transition-opacity"
                >
                    <span className="truncate">Sign Up</span>
                </Link>
            </div>
        </header>
    )
}
