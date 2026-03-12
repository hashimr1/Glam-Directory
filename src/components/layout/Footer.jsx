import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-border-neutral pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Left Side: Logo & Mission */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl">flare</span>
                            <span className="text-2xl font-bold tracking-tight text-text-main">
                                Glam Directory
                            </span>
                        </div>
                        <p className="text-text-muted text-base leading-relaxed max-w-sm">
                            The premium destination for booking elite beauty professionals for weddings, events,
                            and editorial shoots.
                        </p>
                    </div>
                    {/* Center: Navigation Columns */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">
                                Company
                            </h3>
                            <nav className="flex flex-col gap-3">
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    About Us
                                </a>
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    Team
                                </a>
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    Blog
                                </a>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">
                                Support
                            </h3>
                            <nav className="flex flex-col gap-3">
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    Safety
                                </a>
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    Cancellation Options
                                </a>
                                <a className="text-text-muted hover:text-primary transition-colors text-sm" href="#">
                                    Contact Us
                                </a>
                            </nav>
                        </div>
                    </div>
                    {/* Right Side: Social Media */}
                    <div className="md:col-span-3 flex flex-col items-start md:items-end gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">
                            Follow Us
                        </h3>
                        <div className="flex gap-4">
                            <a
                                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                                href="#"
                            >
                                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
                                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                                </svg>
                            </a>
                            <a
                                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                                href="#"
                            >
                                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
                                    <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Bottom Footer */}
                <div className="pt-8 border-t border-border-neutral flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-text-muted">
                        © 2024 Glam Directory. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a className="text-sm text-text-muted hover:text-primary transition-colors" href="#">
                            Privacy
                        </a>
                        <a className="text-sm text-text-muted hover:text-primary transition-colors" href="#">
                            Terms
                        </a>
                        <a className="text-sm text-text-muted hover:text-primary transition-colors" href="#">
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
