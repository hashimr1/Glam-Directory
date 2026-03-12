import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ClientNav() {
    const { userProfile, signOut } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

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
                <div className="relative group" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1 pl-3 pr-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col items-end mr-1 hidden sm:flex">
                            <span className="text-sm font-bold text-text-main">
                                {userProfile?.name || 'User'}
                            </span>
                        </div>
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100 ring-2 ring-white">
                            {userProfile?.avatar_url ? (
                                <img
                                    alt="User Profile"
                                    className="h-full w-full object-cover"
                                    src={userProfile.avatar_url}
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-sm font-bold">
                                    {userProfile?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50 text-gray-500">
                            <span className="material-symbols-outlined text-xl">menu</span>
                        </div>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-3 w-60 origin-top-right rounded-xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-border-neutral focus:outline-none z-50 overflow-hidden">
                            <div className="py-2">
                                <Link
                                    to="/bookings"
                                    className="block px-4 py-3 text-sm font-semibold text-text-main hover:bg-gray-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Bookings
                                </Link>
                                <Link
                                    to="/saved"
                                    className="block px-4 py-3 text-sm font-semibold text-text-main hover:bg-gray-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Saved Artists
                                </Link>
                                <div className="my-1 border-t border-gray-100"></div>
                                <Link
                                    to="/onboarding/1"
                                    className="block px-4 py-3 text-sm font-semibold text-primary hover:bg-gray-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Become an Artist
                                </Link>
                                <div className="my-1 border-t border-gray-100"></div>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-3 text-sm text-text-main hover:bg-gray-50 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
