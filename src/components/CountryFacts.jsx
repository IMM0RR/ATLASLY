// src/components/CountryFacts.jsx
import React, { useState, useEffect, useRef } from 'react'
import '../styles/_facts.scss'

const FACTS = [
    { emoji: '🌍', text: 'Россия — самая большая страна в мире, она охватывает 11 часовых поясов.' },
    { emoji: '🏝️', text: 'В Индонезии более 17 000 островов — это самый большой архипелаг в мире.' },
    { emoji: '🗺️', text: 'Ватикан — самая маленькая страна в мире, всего 0,44 км².' },
    { emoji: '🌊', text: 'В Канаде больше всего озёр в мире — более 60% всех озёр планеты.' },
    { emoji: '🏔️', text: 'В Непале находятся 8 из 10 самых высоких горных вершин мира.' },
    { emoji: '🌵', text: 'Пустыня Сахара в Африке примерно такого же размера, как США.' },
    { emoji: '🐧', text: 'Антарктида — единственный континент без постоянного населения.' },
    { emoji: '🌐', text: 'В мире 195 стран, признанных Организацией Объединённых Наций.' },
    { emoji: '🏙️', text: 'Токио — самый густонаселённый мегаполис, более 37 миллионов человек.' },
    { emoji: '🌿', text: 'Бразилия содержит около 60% тропических лесов Амазонии.' },
    { emoji: '💧', text: 'Река Нил в Африке считается самой длинной рекой в мире — 6 650 км.' },
    { emoji: '🧭', text: 'Франция — самая посещаемая страна, около 90 миллионов туристов в год.' },
    { emoji: '🏛️', text: 'В Греции больше археологических музеев, чем в любой другой стране.' },
    { emoji: '🎌', text: 'Япония состоит из более чем 6 800 островов.' },
    { emoji: '🦁', text: 'Африка — единственный континент, который простирается от северной до южной умеренной зоны.' },
]

function CountryFacts() {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(true)
    const timerRef = useRef(null)

    const cycle = () => {
        setVisible(false)
        setTimeout(() => {
            setIndex(i => (i + 1) % FACTS.length)
            setVisible(true)
        }, 400)
    }

    useEffect(() => {
        timerRef.current = setInterval(cycle, 5000)
        return () => clearInterval(timerRef.current)
    }, [])

    const fact = FACTS[index]

    return (
        <div className="facts-block">
            <div className="facts-label">знаете ли вы?</div>
            <div className={`facts-content ${visible ? 'facts-in' : 'facts-out'}`}>
                <span className="facts-emoji">{fact.emoji}</span>
                <p className="facts-text">{fact.text}</p>
            </div>
            <div className="facts-dots">
                {FACTS.map((_, i) => (
                    <span
                        key={i}
                        className={`facts-dot ${i === index ? 'active' : ''}`}
                        onClick={() => { setIndex(i); setVisible(true); clearInterval(timerRef.current); timerRef.current = setInterval(cycle, 5000) }}
                    />
                ))}
            </div>
        </div>
    )
}

export default CountryFacts