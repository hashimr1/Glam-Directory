import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthModal({ children }) {
    const navigate = useNavigate()

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) navigate('/')
    }

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal card */}
            <div
                className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>

            <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        .animate-modal-in {
          animation: modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
        </div>
    )
}
