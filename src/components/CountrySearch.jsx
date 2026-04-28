import React, { useState, useEffect, useRef } from 'react'
import '../styles/_search.scss'

function CountrySearch({ svgRef, mode, selectedCountries, onToggleCountry, svgLoaded }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const containerRef = useRef(null)

  // Build country list from SVG paths — re-runs when SVG is loaded
  useEffect(() => {
    if (!svgLoaded || !svgRef.current) return

    const paths = Array.from(svgRef.current.querySelectorAll('path'))
    const seen = new Map()

    paths.forEach(p => {
      const id = p.getAttribute('id')
      const name = (
        p.getAttribute('name') ||
        p.getAttribute('data-name') ||
        p.classList[0] ||
        'Unknown'
      ).trim()

      const key = id || name
      if (!seen.has(key)) {
        seen.set(key, { key, name, id })
      }
    })

    const sorted = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name))
    setAllCountries(sorted)
  }, [svgLoaded, svgRef])

  // Filter on query change
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults(allCountries)
    } else {
      setResults(allCountries.filter(c => c.name.toLowerCase().includes(q)))
    }
  }, [query, allCountries])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleHoverEnter = (item) => {
    if (!svgRef.current) return
    try {
      const paths = item.id
        ? svgRef.current.querySelectorAll(`path[id="${item.id}"]`)
        : svgRef.current.querySelectorAll(`path[name="${item.name}"], path.${CSS.escape(item.name)}`)
      paths.forEach(p => p.classList.add('hoverHighlight'))
    } catch {}
  }

  const handleHoverLeave = () => {
    if (!svgRef.current) return
    svgRef.current.querySelectorAll('path.hoverHighlight').forEach(p =>
      p.classList.remove('hoverHighlight')
    )
  }

  return (
    <div className="country-search" ref={containerRef}>
      <input
        id="search-input"
        type="text"
        placeholder="Search country..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
      />
      {open && results.length > 0 && (
        <div id="search-results">
          {results.map(item => (
            <div
              key={item.key}
              className="search-item"
              onMouseEnter={() => handleHoverEnter(item)}
              onMouseLeave={handleHoverLeave}
              onClick={() => onToggleCountry(item.key, item.name)}
            >
              <span>{item.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedCountries.has(item.key)}
                onChange={() => onToggleCountry(item.key, item.name)}
                onClick={e => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountrySearch
