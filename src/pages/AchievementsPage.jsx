import React, { useState, useEffect } from 'react'
import LevelBanner from '../components/achievements/LevelBanner.jsx'
import AchievementCard from '../components/achievements/AchievementCard.jsx'
import '../styles/achievements/_achievements.scss'
import {
    ACHIEVEMENTS,
    getClaimedAchievements,
    claimAchievement,
    getTotalXP,
    getLevelInfo,
} from '../utils/achievements'

function AchievementsPage({ beenCount, mode }) {
    const [claimed, setClaimed] = useState(() => getClaimedAchievements())
    const [xp, setXp] = useState(() => getTotalXP())
    const [justClaimed, setJustClaimed] = useState(null)

    const levelInfo = getLevelInfo(xp)

    const handleClaim = (id, achXp) => {
        claimAchievement(id)
        const newClaimed = new Set(claimed)
        newClaimed.add(id)
        setClaimed(newClaimed)
        setXp(getTotalXP())
        setJustClaimed(id)
        setTimeout(() => setJustClaimed(null), 1200)
    }

    const unlocked   = ACHIEVEMENTS.filter(a => a.check(beenCount) && !claimed.has(a.id))
    const claimedAch = ACHIEVEMENTS.filter(a => claimed.has(a.id))
    const locked     = ACHIEVEMENTS.filter(a => !a.check(beenCount) && !claimed.has(a.id))

    return (
        <div className="achievements-page">
            <div className="achievements-scroll">

                <LevelBanner levelInfo={levelInfo} />

                {unlocked.length > 0 && (
                    <section className="ach-section">
                        <div className="ach-section-title ready">ready to claim</div>
                        <div className="ach-grid">
                            {unlocked.map(a => (
                                <AchievementCard
                                    key={a.id}
                                    achievement={a}
                                    state="unlocked"
                                    justClaimed={justClaimed === a.id}
                                    onClaim={() => handleClaim(a.id, a.xp)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {claimedAch.length > 0 && (
                    <section className="ach-section">
                        <div className="ach-section-title claimed">claimed</div>
                        <div className="ach-grid">
                            {claimedAch.map(a => (
                                <AchievementCard key={a.id} achievement={a} state="claimed" />
                            ))}
                        </div>
                    </section>
                )}

                {locked.length > 0 && (
                    <section className="ach-section">
                        <div className="ach-section-title locked">locked</div>
                        <div className="ach-grid">
                            {locked.map(a => (
                                <AchievementCard key={a.id} achievement={a} state="locked" />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    )
}

export default AchievementsPage