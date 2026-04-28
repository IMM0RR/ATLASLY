import React from 'react'
import '../styles/_navbar.scss'

function Navbar({ page, onNavigate }) {
  return (
    <header className="navbar">
      <div className="logo">ATLASLY</div>
      <nav className="menu">
        <button
          className={`nav-btn ${page === 'profile' ? 'active' : ''}`}
          onClick={() => onNavigate(page === 'profile' ? 'map' : 'profile')}
        >
          {page === 'profile' ? 'map' : 'profile'}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
