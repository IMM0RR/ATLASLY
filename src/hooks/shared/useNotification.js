import { useState, useRef } from 'react'

export function useNotification() {
    const [notification, setNotification] = useState(null)
    const timerRef = useRef(null)

    const showNotification = (name, adding) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setNotification({ name, adding })
        timerRef.current = setTimeout(() => setNotification(null), 2200)
    }

    return { notification, showNotification }
}