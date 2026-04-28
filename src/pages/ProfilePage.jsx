import React, { useState, useEffect } from 'react'
import '../styles/_profile.scss'
import CountryFacts from '../components/CountryFacts'
import { getSelectedCountries, getCountryNames, getRatings, setRating } from '../utils/cookieStorage'

// Цвет заполненной звезды зависит от оценки — чем выше, тем ярче
const FILLED_STAR_STYLES = {
    1: { color: 'rgba(83,160,253,0.35)',  textShadow: 'none' },
    2: { color: 'rgba(83,160,253,0.55)',  textShadow: 'none' },
    3: { color: 'rgba(83,160,253,0.80)',  textShadow: '0 0 6px rgba(83,160,253,0.4)' },
    4: { color: '#53A0FD',               textShadow: '0 0 8px rgba(83,160,253,0.6)' },
    5: { color: '#7b8fff',               textShadow: '0 0 12px rgba(123,143,255,0.8)' },
}

const EMPTY_STYLE = { color: 'rgba(255,255,255,0.15)', textShadow: 'none' }

function StarRating({ code, value, onChange }) {
    const [hover, setHover] = useState(0)
    const display = hover || value

    return (
        <div className="star-row">
            {[1,2,3,4,5].map(n => {
                const filled = n <= display
                const style  = filled ? FILLED_STAR_STYLES[display] : EMPTY_STYLE
                return (
                    <span
                        key={n}
                        className="star"
                        style={style}
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                        onClick={e => { e.stopPropagation(); onChange(n === value ? 0 : n) }}
                    >★</span>
                )
            })}
        </div>
    )
}

function ProfilePage({ beenCount, wishCount, percent, total }) {
    const [ratings, setRatings] = useState(getRatings)
    const [sort, setSort] = useState('alpha-asc')

    useEffect(() => { setRatings(getRatings()) }, [])

    const handleRate = (code, value) => {
        setRating(code, value)
        setRatings(prev => ({ ...prev, [code]: value }))
    }

    const beenSet  = getSelectedCountries('been')
    const names    = getCountryNames()
    const countries = [...beenSet].map(code => ({
        code,
        name:   names[code] || code,
        rating: ratings[code] || 0,
    }))

    const sorted = [...countries].sort((a, b) => {
        if (sort === 'alpha-asc')   return a.name.localeCompare(b.name)
        if (sort === 'alpha-desc')  return b.name.localeCompare(a.name)
        if (sort === 'rating-asc')  return a.rating - b.rating
        if (sort === 'rating-desc') return b.rating - a.rating
        return 0
    })

    const R    = 90
    const circ = 2 * Math.PI * R
    const offset = circ * (1 - beenCount / total)

    return (
        <div className="profile-page">
            <div className="profile-scroll">

                {/* ── Статистика ── */}
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
                                        stroke="url(#ringGrad)" strokeWidth="6" strokeLinecap="round"
                                        strokeDasharray={circ} strokeDashoffset={offset}
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

                {/* ── Факты ── */}
                <CountryFacts />

                {/* ── Список стран ── */}
                {countries.length > 0 && (
                    <div className="countries-section">
                        <div className="countries-header">
                            <span className="countries-title">visited countries</span>
                            <div className="sort-buttons">
                                <button className={sort === 'alpha-asc'   ? 'active' : ''} onClick={() => setSort('alpha-asc')}>A→Z</button>
                                <button className={sort === 'alpha-desc'  ? 'active' : ''} onClick={() => setSort('alpha-desc')}>Z→A</button>
                                <button className={sort === 'rating-desc' ? 'active' : ''} onClick={() => setSort('rating-desc')}>★↑</button>
                                <button className={sort === 'rating-asc'  ? 'active' : ''} onClick={() => setSort('rating-asc')}>★↓</button>
                            </div>
                        </div>
                        <div className="countries-grid">
                            {sorted.map(({ code, name, rating }) => (
                                <div
                                    key={code}
                                    className="country-card"
                                >
                                    <span className="country-card-name">{name}</span>
                                    <StarRating code={code} value={rating} onChange={val => handleRate(code, val)} />
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