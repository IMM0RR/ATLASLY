import React from 'react'
import '../../styles/achievements/_levelbanner.scss'

function LevelBanner({ levelInfo }) {
    const { current, next, progress, xp } = levelInfo

    return (
        <div className="level-banner">
            <div className="level-top">
                <div className="level-badge">
                    <span className="level-num">{current.level}</span>
                    <span className="level-lbl">level</span>
                </div>
                <div className="level-info">
                    <div className="level-title">{current.title}</div>
                    <div className="level-xp-row">
                        <span className="level-xp">{xp} XP</span>
                        {next && <span className="level-next">→ {next.minXp} XP for {next.title}</span>}
                    </div>
                </div>
            </div>
            <div className="level-bar-wrap">
                <div className="level-bar" style={{ width: `${progress}%` }} />
            </div>
            {!next && <div className="level-maxed">Maximum level reached 👑</div>}
        </div>
    )
}

export default LevelBanner