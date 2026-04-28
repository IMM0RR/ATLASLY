export const ACHIEVEMENTS = [

    // ── COMMON ──────────────────────────────────────────────────
    { id: 'first_step',     tier: 'common',    xp: 30,   icon: '👣', title: 'First Step',        desc: 'Visit your first country',                check: b => b >= 1  },
    { id: 'duo',            tier: 'common',    xp: 40,   icon: '✌️', title: 'Duo',                desc: 'Visit 2 countries',                       check: b => b >= 2  },
    { id: 'trio',           tier: 'common',    xp: 50,   icon: '🌱', title: 'Getting Started',    desc: 'Visit 3 countries',                       check: b => b >= 3  },
    { id: 'five',           tier: 'common',    xp: 75,   icon: '✋', title: 'High Five',           desc: 'Visit 5 countries',                       check: b => b >= 5  },
    { id: 'week',           tier: 'common',    xp: 90,   icon: '📅', title: 'Week of Countries',  desc: 'Visit 7 countries',                       check: b => b >= 7  },

    // ── RARE ────────────────────────────────────────────────────
    { id: 'ten',            tier: 'rare',      xp: 150,  icon: '🔟', title: 'Double Digits',      desc: 'Visit 10 countries',                      check: b => b >= 10 },
    { id: 'fifteen',        tier: 'rare',      xp: 200,  icon: '🧳', title: 'Frequent Flyer',     desc: 'Visit 15 countries',                      check: b => b >= 15 },
    { id: 'twenty',         tier: 'rare',      xp: 260,  icon: '🗺️', title: 'Explorer',            desc: 'Visit 20 countries',                      check: b => b >= 20 },
    { id: 'twentyfive',     tier: 'rare',      xp: 320,  icon: '🧭', title: 'Quarter Century',    desc: 'Visit 25 countries',                      check: b => b >= 25 },
    { id: 'thirty',         tier: 'rare',      xp: 380,  icon: '🌏', title: 'Pathfinder',         desc: 'Visit 30 countries',                      check: b => b >= 30 },
    { id: 'thirtyfive',     tier: 'rare',      xp: 430,  icon: '🛫', title: 'Jet Setter',         desc: 'Visit 35 countries',                      check: b => b >= 35 },

    // ── EPIC ────────────────────────────────────────────────────
    { id: 'forty',          tier: 'epic',      xp: 500,  icon: '🌍', title: 'Globetrotter',       desc: 'Visit 40 countries',                      check: b => b >= 40 },
    { id: 'fifty',          tier: 'epic',      xp: 650,  icon: '🚀', title: 'Horizon Chaser',     desc: 'Visit 50 countries',                      check: b => b >= 50 },
    { id: 'sixty',          tier: 'epic',      xp: 800,  icon: '🌐', title: 'World Walker',       desc: 'Visit 60 countries',                      check: b => b >= 60 },
    { id: 'seventy',        tier: 'epic',      xp: 950,  icon: '🗼', title: 'Monument Seeker',    desc: 'Visit 70 countries',                      check: b => b >= 70 },
    { id: 'seventy_five',   tier: 'epic',      xp: 1100, icon: '🏔️', title: 'Peak Traveler',      desc: 'Visit 75 countries',                      check: b => b >= 75 },
    { id: 'eighty',         tier: 'epic',      xp: 1250, icon: '🛳️', title: 'Ocean Crosser',      desc: 'Visit 80 countries',                      check: b => b >= 80 },

    // ── LEGENDARY ───────────────────────────────────────────────
    { id: 'ninety',         tier: 'legendary', xp: 1600, icon: '🌠', title: 'Star Collector',     desc: 'Visit 90 countries',                      check: b => b >= 90  },
    { id: 'hundred',        tier: 'legendary', xp: 2000, icon: '💯', title: 'Century Club',       desc: 'Visit 100 countries',                     check: b => b >= 100 },
    { id: 'one_twenty',     tier: 'legendary', xp: 2600, icon: '🏅', title: 'Elite Explorer',     desc: 'Visit 120 countries',                     check: b => b >= 120 },
    { id: 'one_fifty',      tier: 'legendary', xp: 3500, icon: '🏆', title: 'Grand Master',       desc: 'Visit 150 countries',                     check: b => b >= 150 },
    { id: 'half_world',     tier: 'legendary', xp: 4500, icon: '🌐', title: 'Half the World',     desc: 'Visit half of all countries (98)',         check: b => b >= 98  },
    { id: 'full_world',     tier: 'legendary', xp: 8000, icon: '👑', title: 'World Conqueror',    desc: 'Visit every country in the world (195)',  check: b => b >= 195 },

]

const CLAIMED_KEY = 'atlasly_claimed_ach'

export function getClaimedAchievements() {
    try { return new Set(JSON.parse(localStorage.getItem(CLAIMED_KEY) || '[]')) }
    catch { return new Set() }
}

export function claimAchievement(id) {
    const claimed = getClaimedAchievements()
    claimed.add(id)
    localStorage.setItem(CLAIMED_KEY, JSON.stringify([...claimed]))
}

export function getTotalXP() {
    const claimed = getClaimedAchievements()
    return ACHIEVEMENTS
        .filter(a => claimed.has(a.id))
        .reduce((sum, a) => sum + a.xp, 0)
}

const LEVELS = [
    { level: 1,  title: 'Homebody',        minXp: 0    },
    { level: 2,  title: 'Daytripper',      minXp: 80   },
    { level: 3,  title: 'Wanderer',        minXp: 200  },
    { level: 4,  title: 'Adventurer',      minXp: 420  },
    { level: 5,  title: 'Explorer',        minXp: 750  },
    { level: 6,  title: 'Pathfinder',      minXp: 1200 },
    { level: 7,  title: 'Voyager',         minXp: 2000 },
    { level: 8,  title: 'Globetrotter',    minXp: 3200 },
    { level: 9,  title: 'World Traveler',  minXp: 5000 },
    { level: 10, title: 'Legend',          minXp: 7500 },
]

export function getLevelInfo(xp) {
    let current = LEVELS[0]
    let next = LEVELS[1]
    for (let i = 0; i < LEVELS.length; i++) {
        if (xp >= LEVELS[i].minXp) {
            current = LEVELS[i]
            next = LEVELS[i + 1] || null
        }
    }
    const progress = next
        ? ((xp - current.minXp) / (next.minXp - current.minXp)) * 100
        : 100
    return { current, next, progress: Math.min(progress, 100), xp }
}