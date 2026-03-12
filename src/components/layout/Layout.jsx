import { Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import UnauthenticatedNav from './UnauthenticatedNav'
import ClientNav from './ClientNav'
import ArtistNav from './ArtistNav'
import Footer from './Footer'

export default function Layout({ hideFooter = false }) {
    const { user, userProfile, loading } = useAuth()

    const renderNav = () => {
        if (loading) return null
        if (!user) return <UnauthenticatedNav />
        if (userProfile?.type === 'artist') return <ArtistNav />
        return <ClientNav />
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {renderNav()}
                <main className="flex-1">
                    <Outlet />
                </main>
                {!hideFooter && <Footer />}
            </div>
        </div>
    )
}
