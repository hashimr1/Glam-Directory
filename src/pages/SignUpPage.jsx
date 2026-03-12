import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from '../components/AuthModal'

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const bgState = { backgroundLocation: location.state?.backgroundLocation || location }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }
        setLoading(true)
        try {
            await signUp(email, password, `${firstName} ${lastName}`)
            await signOut()
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Failed to create account.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthModal>
            <div className="px-8 py-10">
                {/* Header */}
                <div className="mb-7">
                    <h1 className="text-2xl font-extrabold text-text-main tracking-tight">Create your account</h1>
                    <p className="text-text-muted text-sm mt-1">Join our community of brides and beauty professionals.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-text-main" htmlFor="firstName">First Name</label>
                            <input
                                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                                id="firstName"
                                placeholder="Jane"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-text-main" htmlFor="lastName">Last Name</label>
                            <input
                                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                                id="lastName"
                                placeholder="Doe"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-text-main" htmlFor="email">Email address</label>
                        <input
                            className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                            id="email"
                            placeholder="jane.doe@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-text-main" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="w-full h-11 px-3 pr-10 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                                id="password"
                                placeholder="Min. 8 characters"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-600"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility' : 'visibility_off'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-full h-11 mt-1 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide transition-colors shadow-sm shadow-primary/30 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-text-muted mt-5">
                    Already have an account?{' '}
                    <Link className="font-semibold text-primary hover:underline" to="/login" state={bgState}>
                        Log in
                    </Link>
                </p>
            </div>
        </AuthModal>
    )
}
