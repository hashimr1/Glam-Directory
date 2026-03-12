import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requiredType }) {
    const { user, userProfile, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (requiredType && userProfile?.type !== requiredType) {
        if (userProfile?.type === 'artist') {
            return <Navigate to="/dashboard/bookings" replace />
        }
        return <Navigate to="/" replace />
    }

    return children
}
