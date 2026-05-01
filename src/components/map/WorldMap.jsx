import React, { useEffect, useRef, forwardRef } from 'react'
import '../../styles/map/_map.scss'

const WorldMap = forwardRef(function WorldMap(
  { selectedCountries, onToggleCountry, onHover, onHoverEnd, onMouseMove },
  svgContainerRef
) {
  const mapRef = useRef(null)

  // Apply selected classes when selectedCountries changes
  useEffect(() => {
    const container = svgContainerRef?.current || mapRef.current
    if (!container) return

    const svg = container.querySelector('svg')
    if (!svg) return

    // Remove all selected
    svg.querySelectorAll('path.selected').forEach(p => p.classList.remove('selected'))

    // Apply selected
    selectedCountries.forEach(code => {
      // Try by id first
      svg.querySelectorAll(`path[id="${code}"]`).forEach(p => p.classList.add('selected'))
      // Try by name and class
      svg.querySelectorAll(`path[name="${code}"], path.${CSS.escape(code)}`).forEach(p =>
        p.classList.add('selected')
      )
    })
  }, [selectedCountries])

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

    onToggleCountry(code, name || code)
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

    onHover(name, e.clientX, e.clientY)
  }

  const handleMouseOut = (e) => {
    const path = e.target.closest('path')
    if (path) onHoverEnd()
  }

  const handleMouseMove = (e) => {
    const path = e.target.closest('path')
    if (path) onMouseMove(e.clientX, e.clientY)
  }

  return (
    <div className="world-map" ref={mapRef}>
      <div
        className="map-container"
        ref={svgContainerRef}
        onClick={handleSvgClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    </div>
  )
})

export default WorldMap
