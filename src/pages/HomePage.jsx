import React, { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../components/Navbar'
import ModeSwitch from '../components/ModeSwitch'
import CountrySearch from '../components/CountrySearch'
import Tooltip from '../components/Tooltip'
import ProfilePage from './ProfilePage'
import '../styles/_map.scss'
import {
  getSelectedCountries,
  saveCountry,
  removeCountry,
} from '../utils/cookieStorage'

import worldSvgUrl from '../assets/world.svg?url'

// Total countries in the world (UN-recognised + commonly counted)
const TOTAL_COUNTRIES = 195

function HomePage() {
  const [mode, setMode] = useState('been')
  const [selectedCountries, setSelectedCountries] = useState(() =>
    getSelectedCountries('been')
  )
  const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0, visible: false })
  const [svgLoaded, setSvgLoaded] = useState(false)
  const [page, setPage] = useState('map') // 'map' | 'profile'
  const svgContainerRef = useRef(null)
  const svgLoadedRef = useRef(false)

  // Load SVG into container once
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

  // Apply selected classes to SVG paths
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
    const countries = getSelectedCountries(newMode)
    setSelectedCountries(new Set(countries))
  }

  const handleToggleCountry = useCallback((code, name) => {
    setSelectedCountries(prev => {
      const next = new Set(prev)
      if (next.has(code)) {
        next.delete(code)
        removeCountry(mode, code)
      } else {
        next.add(code)
        saveCountry(mode, code)
      }
      return next
    })
  }, [mode])

  // Map events
  const handleSvgClick = (e) => {
    const path = e.target.closest('path')
    if (!path) return
    const id = path.getAttribute('id')
    const name = (
      path.getAttribute('name') ||
      path.getAttribute('data-name') ||
      path.classList[0]
    )?.trim()
    const code = id || name
    if (!code) return
    handleToggleCountry(code, name || code)
  }

  const handleMouseOver = (e) => {
    const path = e.target.closest('path')
    if (!path) return
    const name =
      path.getAttribute('name') ||
      path.getAttribute('data-name') ||
      path.classList[0] ||
      path.getAttribute('id') ||
      'Unknown'
    setTooltip({ text: name, x: e.clientX, y: e.clientY, visible: true })
  }

  const handleMouseOut = (e) => {
    const path = e.target.closest('path')
    if (path) setTooltip(t => ({ ...t, visible: false }))
  }

  const handleMouseMove = (e) => {
    const path = e.target.closest('path')
    if (path) setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }))
  }

  // Stats for profile
  const beenCount = getSelectedCountries('been').size
  const wishCount = getSelectedCountries('wish').size
  const percent = ((beenCount / TOTAL_COUNTRIES) * 100).toFixed(1)

  return (
    <div className={`theme-${mode}`} style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Navbar page={page} onNavigate={setPage} />
      <ModeSwitch mode={mode} onModeChange={handleModeChange} />

      {page === 'map' && (
        <>
          <CountrySearch
            svgRef={svgContainerRef}
            mode={mode}
            selectedCountries={selectedCountries}
            onToggleCountry={handleToggleCountry}
            svgLoaded={svgLoaded}
          />
          <Tooltip
            text={tooltip.text}
            x={tooltip.x}
            y={tooltip.y}
            visible={tooltip.visible}
          />
        </>
      )}

      {page === 'profile' && (
        <ProfilePage
          beenCount={beenCount}
          wishCount={wishCount}
          percent={percent}
          total={TOTAL_COUNTRIES}
          mode={mode}
        />
      )}

      {/* Map always mounted so SVG stays loaded */}
      <div className="world-map" style={{ display: page === 'map' ? 'flex' : 'none' }}>
        <div
          className="map-container"
          ref={svgContainerRef}
          onClick={handleSvgClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  )
}

export default HomePage
