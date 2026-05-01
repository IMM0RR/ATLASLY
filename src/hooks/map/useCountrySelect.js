import { useState, useCallback } from 'react'
import { getSelectedCountries, saveCountry, removeCountry } from '../../utils/cookieStorage'

export function useCountrySelect(mode, onToggle) {
    const [selectedCountries, setSelectedCountries] = useState(() =>
        getSelectedCountries(mode)
    )

    const handleToggleCountry = useCallback((code, name) => {
        setSelectedCountries(prev => {
            const next = new Set(prev)
            if (next.has(code)) {
                next.delete(code)
                removeCountry(mode, code)
                onToggle?.(code, name, false)
            } else {
                next.add(code)
                saveCountry(mode, code, name)
                onToggle?.(code, name, true)
            }
            return next
        })
    }, [mode, onToggle])

    const loadMode = useCallback((newMode) => {
        setSelectedCountries(new Set(getSelectedCountries(newMode)))
    }, [])

    return { selectedCountries, handleToggleCountry, loadMode }
}