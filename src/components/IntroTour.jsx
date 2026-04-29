import React, { useState, useEffect, useRef } from 'react'
import '../styles/_introtour.scss'

const STORAGE_KEY = 'atlasly_intro_seen'

const SCREEN_MARGIN = 16
const NAVBAR_H = 76
const TIP_W = 300
const TIP_H = 180
const GAP = 12

const STEPS = [
    {
        id: 'welcome',
        target: null,
        title: 'Welcome to ATLASLY',
        text: "Your personal travel tracker. Here you can log every country you've been to, build a wishlist, collect achievements and watch your progress grow.",
    },
    {
        id: 'map',
        target: '.world-map',
        title: 'The world map',
        text: "The map is the heart of ATLASLY. You can click any country to mark it — visited countries light up in blue. The map supports zoom and drag.",
    },
    {
        id: 'mode-switch',
        target: '.mode-switch',
        title: 'Been & Wish modes',
        text: "Over here you can switch between two modes — \"been\" for countries you've visited, and \"wish\" for places you'd love to go someday.",
    },
    {
        id: 'search',
        target: '.country-search',
        title: 'Country search',
        text: "Up here you can search for any country by name. It's handy when a country is too small to click on the map, or you just know the name.",
    },
    {
        id: 'zoom',
        target: '.zoom-controls',
        title: 'Zoom controls',
        text: "Down here you'll find zoom buttons and a slider. You can also use the scroll wheel to zoom, and hold left click to drag the map around.",
    },
    {
        id: 'nav-profile',
        target: '[data-tour="nav-profile"]',
        title: 'Your profile',
        text: "This button opens your profile — you'll see how many countries you've visited, what percentage of the world that is, and a list where you can rate each country.",
    },
    {
        id: 'nav-achievements',
        target: '[data-tour="nav-achievements"]',
        title: 'Achievements',
        text: "Here you can find your achievement board. As you visit more countries, achievements unlock — you can claim them for XP and level up your traveler rank.",
    },
    {
        id: 'premium',
        target: '[data-tour="premium"]',
        title: 'Premium',
        text: "This button leads to the Premium page, where you can unlock detailed analytics, map export, cloud sync, and exclusive features that go beyond the basics.",
    },
    {
        id: 'done',
        target: null,
        title: "You're all set!",
        text: "Go ahead and mark your first country on the map. Your journey starts here.",
    },
]

function calcTooltipStyle(rect) {
    const vw = window.innerWidth
    const vh = window.innerHeight

    if (!rect) {
        return {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    const belowTop    = rect.bottom + GAP
    const aboveBottom = rect.top - GAP - TIP_H
    const rightLeft   = rect.right + GAP
    const leftRight   = rect.left - GAP - TIP_W

    let vertCenter = rect.top + rect.height / 2 - TIP_H / 2
    vertCenter = Math.max(NAVBAR_H, Math.min(vh - TIP_H - SCREEN_MARGIN, vertCenter))

    let horizCenter = rect.left + rect.width / 2 - TIP_W / 2
    horizCenter = Math.max(SCREEN_MARGIN, Math.min(vw - TIP_W - SCREEN_MARGIN, horizCenter))

    // Снизу
    if (belowTop + TIP_H + SCREEN_MARGIN <= vh) {
        return { position: 'fixed', top: belowTop, left: horizCenter }
    }
    // Сверху
    if (aboveBottom >= NAVBAR_H) {
        return { position: 'fixed', top: aboveBottom, left: horizCenter }
    }
    // Справа
    if (rightLeft + TIP_W + SCREEN_MARGIN <= vw) {
        return { position: 'fixed', top: vertCenter, left: rightLeft }
    }
    // Слева
    if (leftRight >= SCREEN_MARGIN) {
        return { position: 'fixed', top: vertCenter, left: leftRight }
    }
    // Fallback — по центру
    return {
        position: 'fixed',
        top:  Math.max(NAVBAR_H, vh / 2 - TIP_H / 2),
        left: Math.max(SCREEN_MARGIN, vw / 2 - TIP_W / 2),
    }
}

function getEl(selector) {
    if (!selector) return null
    return document.querySelector(selector)
}

function getElRect(selector) {
    const el = getEl(selector)
    if (!el) return null
    return el.getBoundingClientRect()
}

// ── Spotlight — тёмный оверлей с прозрачной дыркой ──
function Spotlight({ rect }) {
    if (!rect) return null
    const PAD = 8
    return (
        <div
            className="tour-spotlight"
            style={{
                top:    rect.top    - PAD,
                left:   rect.left   - PAD,
                width:  rect.width  + PAD * 2,
                height: rect.height + PAD * 2,
            }}
        />
    )
}

// ── Тултип ──
function Tooltip({ step, tipStyle, onNext, onSkip, isLast, stepIndex, total, animKey }) {
    return (
        <div
            className="tour-tooltip"
            style={tipStyle}
            key={animKey}
        >
            <div className="tour-tooltip__step">{stepIndex + 1} / {total}</div>
            <div className="tour-tooltip__title">{step.title}</div>
            <p className="tour-tooltip__text">{step.text}</p>
            <div className="tour-tooltip__nav">
                {!isLast && (
                    <span className="tour-tooltip__skip" onClick={onSkip}>Skip tour</span>
                )}
                <button className="tour-tooltip__btn" onClick={onNext}>
                    {isLast ? 'Start exploring' : 'Next →'}
                </button>
            </div>
        </div>
    )
}

function IntroTour() {
    const [active,  setActive]  = useState(false)
    const [stepIdx, setStepIdx] = useState(0)
    const [rect,    setRect]    = useState(null)
    const [tipStyle, setTipStyle] = useState({})
    const [animKey, setAnimKey]  = useState(0)

    // Показать тур при первом заходе
    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTimeout(() => setActive(true), 600)
        }
    }, [])

    const step = STEPS[stepIdx]

    // Обновить rect и позицию тултипа при смене шага
    useEffect(() => {
        if (!active) return

        const update = () => {
            const r = getElRect(step.target)
            setRect(r)
            setTipStyle(calcTooltipStyle(r, step.id))
        }

        update()
        // Повторить через 100ms на случай если DOM ещё не обновился
        const t = setTimeout(update, 100)
        return () => clearTimeout(t)
    }, [active, stepIdx]) // eslint-disable-line

    const goNext = () => {
        const next = stepIdx + 1
        if (next >= STEPS.length) {
            finish()
        } else {
            setStepIdx(next)
            setAnimKey(k => k + 1)
        }
    }

    const finish = () => {
        localStorage.setItem(STORAGE_KEY, '1')
        setActive(false)
    }

    if (!active) return null

    return (
        <>
            {/* Оверлей с дыркой */}
            <div className="tour-overlay" onClick={e => e.stopPropagation()}>
                {rect && <Spotlight rect={rect} />}
            </div>

            {/* Тултип */}
            <Tooltip
                step={step}
                tipStyle={tipStyle}
                onNext={goNext}
                onSkip={finish}
                isLast={stepIdx === STEPS.length - 1}
                stepIndex={stepIdx}
                total={STEPS.length}
                animKey={animKey}
            />
        </>
    )
}

export default IntroTour