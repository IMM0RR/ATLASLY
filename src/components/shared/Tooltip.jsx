import React from 'react'
import '../../styles/shared/_tooltip.scss'

function Tooltip({ text, x, y, visible }) {
  return (
    <div
      className={`country-tooltip ${visible ? 'visible' : ''}`}
      style={{ left: x + 10, top: y - 30 }}
    >
      {text}
    </div>
  )
}

export default Tooltip
