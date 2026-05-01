import React, { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../components/shared/Navbar'
import ModeSwitch from '../components/map/ModeSwitch'
import CountrySearch from '../components/map/CountrySearch'
import Tooltip from '../components/shared/Tooltip'
import ProfilePage from './ProfilePage'
import AchievementsPage from './AchievementsPage'
import PremiumPage from './PremiumPage'
import IntroTour from '../components/IntroTour'
import { useMapZoom } from '../hooks/map/useMapZoom'
import { useCountrySelect } from '../hooks/map/useCountrySelect'
import { useNotification } from '../hooks/shared/useNotification'
import '../styles/map/_map.scss'
import { getSelectedCountries } from '../utils/cookieStorage'
import worldSvgUrl from '../assets/world.svg?url'

const TOTAL_COUNTRIES = 195

function HomePage() {
    const [mode, setMode] = useState('been')
    const [svgLoaded, setSvgLoaded] = useState(false)
    const [page, setPage] = useState('map')
    const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0, visible: false })

    const svgContainerRef = useRef(null)
    const mapWrapperRef = useRef(null)
    const svgLoadedRef = useRef(false)
    const didPan = useRef(false)

    const { notification, showNotification } = useNotification()

    const { selectedCountries, handleToggleCountry, loadMode } = useCountrySelect(
        mode,
        (code, name, adding) => {
            if (mode === 'been') showNotification(name || code, adding)
        }
    )

    const {
        scale, translate,
        scaleRef, translateRef,
        applyTransform, resetTransform,
        MIN_SCALE, MAX_SCALE,
    } = useMapZoom(mapWrapperRef)

    // Pan state
    const isPanning = useRef(false)
    const panStart = useRef({ x: 0, y: 0 })

    // Load SVG
    useEffect(() => {
        if (svgLoadedRef.current) return
        fetch(worldSvgUrl)
            .then(r => r.text())
            .then(html => {
                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = html
                    svgLoadedRef.current = true
                    setSvgLoaded(true)
                    applySelections(getSelectedCountries('been'))
                }
            })
    }, [])

    const applySelections = useCallback((countries) => {
        if (!svgContainerRef.current) return
        const svg = svgContainerRef.current.querySelector('svg')
        if (!svg) return
        svg.querySelectorAll('path.selected').forEach(p => p.classList.remove('selected'))
        countries.forEach(code => {
            svg.querySelectorAll(`path[id="${code}"]`).forEach(p => p.classList.add('selected'))
            try {
                svg.querySelectorAll(`path[name="${code}"], path.${CSS.escape(code)}`).forEach(p =>
                    p.classList.add('selected')
                )
            } catch {}
        })
    }, [])

    useEffect(() => {
        applySelections(selectedCountries)
    }, [selectedCountries, applySelections])

    const handleModeChange = (newMode) => {
        setMode(newMode)
        loadMode(newMode)
    }

    // Pan handlers
    const handleMouseDown = (e) => {
        if (scaleRef.current <= MIN_SCALE) return
        if (e.button !== 0) return
        isPanning.current = true
        didPan.current = false
        panStart.current = {
            x: e.clientX - translateRef.current.x,
            y: e.clientY - translateRef.current.y,
        }
    }

    const handleMouseMoveMap = (e) => {
        if (isPanning.current) {
            didPan.current = true
            const newTx = e.clientX - panStart.current.x
            const newTy = e.clientY - panStart.current.y
            translateRef.current = { x: newTx, y: newTy }
            applyTransform(scaleRef.current, newTx, newTy)
            return
        }
        const path = e.target.closest('path')
        if (path) setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }))
    }

    const handleMouseUp = () => { isPanning.current = false }

    const handleSvgClick = (e) => {
        if (didPan.current) return
        const path = e.target.closest('path')
        if (!path) return
        const id = path.getAttribute('id')
        const name = (path.getAttribute('name') || path.getAttribute('data-name') || path.classList[0])?.trim()
        const code = id || name
        if (!code) return
        handleToggleCountry(code, name || code)
    }

    const handleMouseOverMap = (e) => {
        if (isPanning.current) return
        const path = e.target.closest('path')
        if (!path) return
        const name = path.getAttribute('name') || path.getAttribute('data-name') || path.classList[0] || path.getAttribute('id') || 'Unknown'
        setTooltip({ text: name, x: e.clientX, y: e.clientY, visible: true })
    }

    const handleMouseOutMap = (e) => {
        if (e.target.closest('path')) setTooltip(t => ({ ...t, visible: false }))
    }

    const beenCount = getSelectedCountries('been').size
    const wishCount = getSelectedCountries('wish').size
    const percent = ((beenCount / TOTAL_COUNTRIES) * 100).toFixed(1)

    return (
        <div className={`theme-${mode}`} style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <Navbar page={page} onNavigate={setPage} mode={mode} />
            <IntroTour />

            {page === 'map' && <ModeSwitch mode={mode} onModeChange={handleModeChange} />}

            {page === 'map' && (
                <>
                    <CountrySearch
                        svgRef={svgContainerRef}
                        mode={mode}
                        selectedCountries={selectedCountries}
                        onToggleCountry={handleToggleCountry}
                        svgLoaded={svgLoaded}
                    />
                    <Tooltip text={tooltip.text} x={tooltip.x} y={tooltip.y} visible={tooltip.visible} />

                    {notification && (
                        <div className={`country-notification ${notification.adding ? 'notif-add' : 'notif-remove'}`}>
                            <span className="notif-icon">{notification.adding ? '✓' : '✕'}</span>
                            <span className="notif-name">{notification.name}</span>
                            <span className="notif-sub">{notification.adding ? 'added to been' : 'removed from been'}</span>
                        </div>
                    )}

                    <div className="zoom-controls">
                        <button className="zoom-btn" onClick={() => {
                            const ns = Math.min(scaleRef.current * 1.3, MAX_SCALE)
                            applyTransform(ns, translateRef.current.x, translateRef.current.y)
                        }}>+</button>
                        <input
                            type="range" className="zoom-slider"
                            min={MIN_SCALE} max={MAX_SCALE} step={0.05} value={scale}
                            onChange={e => {
                                const ns = parseFloat(e.target.value)
                                if (ns <= MIN_SCALE) { resetTransform(); return }
                                applyTransform(ns, translateRef.current.x, translateRef.current.y)
                            }}
                            orient="vertical"
                        />
                        <button className="zoom-btn" onClick={() => {
                            const ns = Math.max(scaleRef.current / 1.3, MIN_SCALE)
                            if (ns <= MIN_SCALE) { resetTransform(); return }
                            applyTransform(ns, translateRef.current.x, translateRef.current.y)
                        }}>−</button>
                    </div>
                </>
            )}

            {page === 'profile' && (
                <ProfilePage beenCount={beenCount} wishCount={wishCount} percent={percent} total={TOTAL_COUNTRIES} mode={mode} />
            )}
            {page === 'achievements' && (
                <AchievementsPage beenCount={beenCount} mode={mode} />
            )}
            {page === 'premium' && (
                <PremiumPage mode={mode} onNavigate={setPage} />
            )}

            <div
                className="world-map"
                ref={mapWrapperRef}
                style={{ display: page === 'map' ? 'flex' : 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMoveMap}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="map-container"
                    ref={svgContainerRef}
                    style={{
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        willChange: 'transform',
                    }}
                    onClick={handleSvgClick}
                    onMouseOver={handleMouseOverMap}
                    onMouseOut={handleMouseOutMap}
                />
            </div>
        </div>
    )
}

export default HomePage