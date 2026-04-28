import React from 'react'
import '../styles/_profile.scss'

function ProfilePage({ beenCount, wishCount, percent, total, mode }) {
  const progressDeg = (beenCount / total) * 360

  return (
    <div className="profile-page">
      <div className="profile-content">

        {/* Big stat: been */}
        <div className="stat-card stat-been">
          <div className="stat-number">{beenCount}</div>
          <div className="stat-label">countries visited</div>
        </div>

        {/* Center: circular progress */}
        <div className="stat-center">
          <div className="progress-ring">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Background circle */}
              <circle
                cx="100" cy="100" r="80"
                fill="none"
                stroke="rgba(83,160,253,0.1)"
                strokeWidth="10"
              />
              {/* Progress arc */}
              <circle
                cx="100" cy="100" r="80"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - beenCount / total)}`}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#53A0FD" />
                  <stop offset="100%" stopColor="#00E5D4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-label">
              <span className="ring-percent">{percent}%</span>
              <span className="ring-sub">of the world</span>
            </div>
          </div>
          <div className="total-note">{total} countries total</div>
        </div>

        {/* Big stat: wish */}
        <div className="stat-card stat-wish">
          <div className="stat-number">{wishCount}</div>
          <div className="stat-label">countries on wishlist</div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
