import React, { useState, useEffect } from 'react'
import '../styles/_profile.scss'
import { getSelectedCountries, getCountryNames, getRatings, setRating } from '../utils/cookieStorage'

const STAR_COLORS = {
    0: 'transparent',
    1: 'rgba(40, 169, 255, 0.1)',
    2: 'rgba(40, 169, 255, 0.3)',
    3: 'rgba(40, 169, 255, 0.5)',
    4: 'rgba(64, 180, 255, 0.7)',
    5: 'rgba(64, 200, 255, 0.9)',
};

function StarRating({ code, value, onChange }) {
    const [hover, setHover] = useState(0)
    const display = hover || value

    return (
        <div className="star-row">
            {[1, 2, 3, 4, 5].map(n => (
                <span
                    key={n}
                    className="star"
                    style={{ color: n <= display ? STAR_COLORS[n] : 'rgba(255,255,255,0.12)' }}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={e => { e.stopPropagation(); onChange(n === value ? 0 : n) }}
                >★</span>
            ))}
        </div>
    )
}

function ProfilePage({ beenCount, wishCount, percent, total, mode }) {
    const [ratings, setRatings] = useState(getRatings)
    const [sort, setSort] = useState('alpha-asc') // 'alpha-asc' | 'alpha-desc' | 'rating-asc' | 'rating-desc'

    // Re-read when switching to profile
    useEffect(() => {
        setRatings(getRatings())
    }, [])

    const handleRate = (code, value) => {
        setRating(code, value)
        setRatings(prev => ({ ...prev, [code]: value }))
    }

    // Countries list
    const beenSet = getSelectedCountries('been')
    const names = getCountryNames()
    const countries = [...beenSet].map(code => ({
        code,
        name: names[code] || code,
        rating: ratings[code] || 0,
    }))

    const sorted = [...countries].sort((a, b) => {
        if (sort === 'alpha-asc') return a.name.localeCompare(b.name)
        if (sort === 'alpha-desc') return b.name.localeCompare(a.name)
        if (sort === 'rating-asc') return a.rating - b.rating
        if (sort === 'rating-desc') return b.rating - a.rating
        return 0
    })

    // Circle progress — thin ring, large radius, text inside fits well
    const R = 90
    const circ = 2 * Math.PI * R
    const offset = circ * (1 - beenCount / total)

    return (
        <div className="profile-page">
            <div className="profile-scroll">

                {/* ── Top stats row ── */}
                <div className="profile-content">
                    <div className="stat-card stat-been">
                        <div className="stat-number">{beenCount}</div>
                        <div className="stat-label">countries visited</div>
                    </div>

                    <div className="stat-center">
                        <div className="progress-ring">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#53A0FD" />
                                        <stop offset="100%" stopColor="#00E5D4" />
                                    </linearGradient>
                                </defs>
                                <circle cx="100" cy="100" r={R} fill="none"
                                        stroke="rgba(83,160,253,0.08)" strokeWidth="6" />
                                <circle cx="100" cy="100" r={R} fill="none"
                                        stroke="url(#ringGrad)" strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={circ}
                                        strokeDashoffset={offset}
                                        transform="rotate(-90 100 100)"
                                        style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                                />
                            </svg>
                            <div className="ring-label">
                                <span className="ring-percent">{percent}%</span>
                                <span className="ring-sub">of the world</span>
                            </div>
                        </div>
                        <div className="total-note">{total} countries total</div>
                    </div>

                    <div className="stat-card stat-wish">
                        <div className="stat-number">{wishCount}</div>
                        <div className="stat-label">on wishlist</div>
                    </div>
                </div>

                {/* ── Been countries list ── */}
                {countries.length > 0 && (
                    <div className="countries-section">
                        <div className="countries-header">
                            <span className="countries-title">visited countries</span>
                            <div className="sort-buttons">
                                <button className={sort === 'alpha-asc' ? 'active' : ''} onClick={() => setSort('alpha-asc')}>A→Z</button>
                                <button className={sort === 'alpha-desc' ? 'active' : ''} onClick={() => setSort('alpha-desc')}>Z→A</button>
                                <button className={sort === 'rating-desc' ? 'active' : ''} onClick={() => setSort('rating-desc')}>★↑</button>
                                <button className={sort === 'rating-asc' ? 'active' : ''} onClick={() => setSort('rating-asc')}>★↓</button>
                            </div>
                        </div>
                        <div className="countries-grid">
                            {sorted.map(({ code, name, rating }) => (
                                <div
                                    key={code}
                                    className="country-card"
                                    style={{
                                        background: rating > 0 ? STAR_COLORS[rating] : 'transparent',
                                    }}
                                >
                                    <span className="country-card-name">{name}</span>
                                    <StarRating
                                        code={code}
                                        value={rating}
                                        onChange={val => handleRate(code, val)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ProfilePage