import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import ArtistProfilePage from './pages/ArtistProfilePage'

// Auth modals
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

// Client pages
import SavedArtistsPage from './pages/client/SavedArtistsPage'
import BookingStep1 from './pages/client/BookingStep1'
import BookingStep2 from './pages/client/BookingStep2'
import BookingStep3 from './pages/client/BookingStep3'
import ClientBookingsPage from './pages/client/ClientBookingsPage'
import QuoteReviewPage from './pages/client/QuoteReviewPage'
import BookingConfirmedPage from './pages/client/BookingConfirmedPage'

// Artist onboarding
import OnboardingStep1 from './pages/onboarding/OnboardingStep1'
import OnboardingStep2 from './pages/onboarding/OnboardingStep2'
import OnboardingStep3 from './pages/onboarding/OnboardingStep3'
import OnboardingStep4 from './pages/onboarding/OnboardingStep4'

// Artist dashboard
import ArtistBookingsPage from './pages/artist/ArtistBookingsPage'
import AvailabilityPage from './pages/artist/AvailabilityPage'
import ArtistQuotePage from './pages/artist/ArtistQuotePage'
import EditProfilePage from './pages/artist/EditProfilePage'

function AppRoutes() {
    const { loading } = useAuth()
    // The background location lets auth modals overlay any page
    const location = useLocation()
    const backgroundLocation = location.state?.backgroundLocation

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    <p className="text-text-muted text-sm font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Render the background page (or the current location if no background) */}
            <Routes location={backgroundLocation || location}>
                <Route element={<Layout />}>
                    {/* Public */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/artists/:id" element={<ArtistProfilePage />} />

                    {/* Client-protected */}
                    <Route path="/saved" element={<ProtectedRoute><SavedArtistsPage /></ProtectedRoute>} />
                    <Route path="/booking/request/:artistId/1" element={<ProtectedRoute><BookingStep1 /></ProtectedRoute>} />
                    <Route path="/booking/request/:artistId/2" element={<ProtectedRoute><BookingStep2 /></ProtectedRoute>} />
                    <Route path="/booking/request/:artistId/3" element={<ProtectedRoute><BookingStep3 /></ProtectedRoute>} />
                    <Route path="/bookings" element={<ProtectedRoute><ClientBookingsPage /></ProtectedRoute>} />
                    <Route path="/booking/quote/:bookingId" element={<ProtectedRoute><QuoteReviewPage /></ProtectedRoute>} />
                    <Route path="/booking/confirmed/:bookingId" element={<ProtectedRoute><BookingConfirmedPage /></ProtectedRoute>} />

                    {/* Artist onboarding */}
                    <Route path="/onboarding/1" element={<ProtectedRoute><OnboardingStep1 /></ProtectedRoute>} />
                    <Route path="/onboarding/2" element={<ProtectedRoute><OnboardingStep2 /></ProtectedRoute>} />
                    <Route path="/onboarding/3" element={<ProtectedRoute><OnboardingStep3 /></ProtectedRoute>} />
                    <Route path="/onboarding/4" element={<ProtectedRoute><OnboardingStep4 /></ProtectedRoute>} />

                    {/* Artist dashboard */}
                    <Route path="/dashboard/bookings" element={<ProtectedRoute requiredType="artist"><ArtistBookingsPage /></ProtectedRoute>} />
                    <Route path="/dashboard/availability" element={<ProtectedRoute requiredType="artist"><AvailabilityPage /></ProtectedRoute>} />
                    <Route path="/dashboard/quote/:bookingId" element={<ProtectedRoute requiredType="artist"><ArtistQuotePage /></ProtectedRoute>} />
                    <Route path="/dashboard/profile/edit" element={<ProtectedRoute requiredType="artist"><EditProfilePage /></ProtectedRoute>} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Auth modals — rendered on top of whatever background page is showing */}
            {backgroundLocation && (
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            )}

            {/* Direct navigation to /login or /signup (no background page) */}
            {!backgroundLocation && (
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            )}
        </>
    )
}

export default function App() {
    return <AppRoutes />
}
