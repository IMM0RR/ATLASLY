import React from 'react'
import '../styles/_achievementcard.scss'

const TIER_LABELS = {
    common:    { label: 'Common',    color: '#7ab3d0' },
    rare:      { label: 'Rare',      color: '#53A0FD' },
    epic:      { label: 'Epic',      color: '#a06fff' },
    legendary: { label: 'Legendary', color: '#ffd166' },
}

function AchievementCard({ achievement, state, onClaim, justClaimed }) {
    const { icon, title, desc, xp, tier } = achievement
    const tierStyle = TIER_LABELS[tier]
    const isLocked   = state === 'locked'
    const isClaimed  = state === 'claimed'
    const isUnlocked = state === 'unlocked'

    return (
        <div className={`ach-card ach-${state} ach-tier-${tier} ${justClaimed ? 'ach-flash' : ''}`}>
            <div className="ach-icon">{isLocked ? '🔒' : icon}</div>
            <div className="ach-body">
                <div className="ach-top-row">
                    <span className="ach-title" style={{ opacity: isLocked ? 0.4 : 1 }}>{title}</span>
                    <span className="ach-tier" style={{ color: tierStyle.color }}>{tierStyle.label}</span>
                </div>
                <div className="ach-desc" style={{ opacity: isLocked ? 0.3 : 0.55 }}>{desc}</div>
                <div className="ach-bottom-row">
                    <span className="ach-xp" style={{ opacity: isLocked ? 0.3 : 1 }}>+{xp} XP</span>
                    {isUnlocked && (
                        <button className="ach-claim-btn" onClick={onClaim}>Claim</button>
                    )}
                    {isClaimed && (
                        <span className="ach-claimed-badge">✓ Claimed</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AchievementCard