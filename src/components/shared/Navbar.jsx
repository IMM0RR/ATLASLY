import React from 'react'
import '../../styles/shared/_navbar.scss'

const MapIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/>
        <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
)

const ProfileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
)

const TrophyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 9a6 6 0 0 0 12 0"/>
        <line x1="12" y1="15" x2="12" y2="22"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
        <path d="M6 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3"/>
        <path d="M18 9h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3"/>
    </svg>
)

function Navbar({ page, onNavigate, mode }) {
    return (
        <header className="navbar">
            <div className="logo">ATLASLY</div>
            <nav className="menu">

                <button
                    className={`premium-btn ${mode === 'wish' ? 'premium-wish' : ''}`}
                    onClick={() => onNavigate('premium')}
                    data-tour="premium"
                >
                    <span className="premium-btn-text">Premium</span>
                </button>

                <div className="nav-divider" />

                <button
                    className={`nav-icon-btn ${page === 'map' ? 'active' : ''}`}
                    onClick={() => onNavigate('map')}
                    title="Map"
                    data-tour="nav-map"
                >
                    <MapIcon />
                </button>

                <button
                    className={`nav-icon-btn ${page === 'profile' ? 'active' : ''}`}
                    onClick={() => onNavigate('profile')}
                    title="Profile"
                    data-tour="nav-profile"
                >
                    <ProfileIcon />
                </button>

                <button
                    className={`nav-icon-btn ${page === 'achievements' ? 'active' : ''}`}
                    onClick={() => onNavigate('achievements')}
                    title="Achievements"
                    data-tour="nav-achievements"
                >
                    <TrophyIcon />
                </button>

            </nav>
        </header>
    )
}

export default Navbar