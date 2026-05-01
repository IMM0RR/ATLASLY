import { useState, useRef, useCallback, useEffect } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 6

export function useMapZoom(mapWrapperRef) {
    const [scale, setScale] = useState(1)
    const [translate, setTranslate] = useState({ x: 0, y: 0 })
    const scaleRef = useRef(1)
    const translateRef = useRef({ x: 0, y: 0 })

    const applyTransform = useCallback((newScale, newTx, newTy) => {
        scaleRef.current = newScale
        translateRef.current = { x: newTx, y: newTy }
        setScale(newScale)
        setTranslate({ x: newTx, y: newTy })
    }, [])

    const resetTransform = useCallback(() => {
        applyTransform(1, 0, 0)
    }, [applyTransform])

    // Wheel zoom
    useEffect(() => {
        const wrapper = mapWrapperRef.current
        if (!wrapper) return

        const onWheel = (e) => {
            e.preventDefault()
            const delta = e.deltaY < 0 ? 1.12 : 1 / 1.12
            const rect = wrapper.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top
            const currentScale = scaleRef.current
            const { x: tx, y: ty } = translateRef.current

            let newScale = currentScale * delta
            if (newScale < MIN_SCALE) { resetTransform(); return }
            if (newScale > MAX_SCALE) newScale = MAX_SCALE

            const newTx = mouseX - (mouseX - tx) * (newScale / currentScale)
            const newTy = mouseY - (mouseY - ty) * (newScale / currentScale)
            applyTransform(newScale, newTx, newTy)
        }

        wrapper.addEventListener('wheel', onWheel, { passive: false })
        return () => wrapper.removeEventListener('wheel', onWheel)
    }, [applyTransform, resetTransform, mapWrapperRef])

    return {
        scale, translate,
        scaleRef, translateRef,
        applyTransform, resetTransform,
        MIN_SCALE, MAX_SCALE,
    }
}