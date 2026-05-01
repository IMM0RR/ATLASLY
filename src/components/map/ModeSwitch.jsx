import React from 'react'
import '../../styles/map/_modeswitch.scss'

function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="mode-switch">
      <button
        className={`mode-option ${mode === 'been' ? 'active-been' : ''}`}
        data-mode="been"
        onClick={() => onModeChange('been')}
      >
        been
      </button>
      <button
        className={`mode-option ${mode === 'wish' ? 'active-wish' : ''}`}
        data-mode="wish"
        onClick={() => onModeChange('wish')}
      >
        wish
      </button>
    </div>
  )
}

export default ModeSwitch
