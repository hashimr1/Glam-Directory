import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ArtistNav() {
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
        <header className="flex items-center justify-between border-b border-border-neutral bg-white px-6 md:px-20 py-4 sticky top-0 z-50">
            <Link to="/dashboard/bookings" className="flex items-center gap-3 text-primary">
                <div className="size-8">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                    </svg>
                </div>
                <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">
                    Glam Directory
                </h2>
            </Link>
            <div className="flex flex-1 justify-end items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center pl-4 pr-3 py-1.5 border border-border-neutral rounded-full bg-white hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <span className="text-text-main font-semibold text-sm mr-2">
                            {userProfile?.name || 'Artist'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-cover bg-center border border-border-neutral overflow-hidden">
                                {userProfile?.avatar_url ? (
                                    <img
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        src={userProfile.avatar_url}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-sm font-bold">
                                        {userProfile?.name?.charAt(0) || 'A'}
                                    </div>
                                )}
                            </div>
                            <span className="material-symbols-outlined text-text-main text-[20px]">menu</span>
                        </div>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-border-neutral overflow-hidden z-[100]">
                            <div className="flex flex-col py-2">
                                <Link
                                    to="/dashboard/bookings"
                                    className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <span className="text-sm font-medium text-text-main">Manage Bookings</span>
                                </Link>
                                <div className="h-[1px] bg-border-neutral mx-5"></div>
                                <Link
                                    to="/dashboard/profile/edit"
                                    className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <span className="text-sm font-medium text-text-main">Edit Profile & Portfolio</span>
                                </Link>
                                <div className="h-[1px] bg-border-neutral mx-5"></div>
                                <Link
                                    to="/dashboard/availability"
                                    className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <span className="text-sm font-medium text-text-main">Manage Availability</span>
                                </Link>
                                <div className="h-[1px] bg-border-neutral w-full my-1"></div>
                                <Link
                                    to={`/artists/${userProfile?.id}`}
                                    className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <span className="text-sm font-bold text-primary">View Public Profile</span>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors w-full text-left"
                                >
                                    <span className="text-sm font-medium text-text-main">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
