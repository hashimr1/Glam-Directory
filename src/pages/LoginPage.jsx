import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from '../components/AuthModal'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const bgState = { backgroundLocation: location.state?.backgroundLocation || location }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signIn(email, password)
            navigate('/')
        } catch (err) {
            setError(err.message || 'Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthModal>
            <div className="px-8 py-10">
                {/* Header */}
                <div className="mb-7">
                    <h1 className="text-2xl font-extrabold text-text-main tracking-tight">Welcome back</h1>
                    <p className="text-text-muted text-sm mt-1">Log in to your account to continue.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-text-main">Email address</label>
                        <input
                            className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-text-main">Password</label>
                            <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
                        </div>
                        <input
                            className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-background-light text-text-main text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-muted/60 transition-colors"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full h-11 mt-1 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide transition-colors shadow-sm shadow-primary/30 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in…' : 'Log In'}
                    </button>
                </form>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs text-text-muted uppercase tracking-wider font-medium">or</span>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-3 border border-slate-200 h-11 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-text-main text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p className="text-center text-sm text-text-muted mt-5">
                    Don't have an account?{' '}
                    <Link className="font-semibold text-primary hover:underline" to="/signup" state={bgState}>
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthModal>
    )
}
