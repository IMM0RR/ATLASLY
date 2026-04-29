// src/components/CountryFacts.jsx
import React, { useState, useEffect, useRef } from 'react'
import '../styles/_facts.scss'

const FACTS = [
    { emoji: '🌍', text: 'Russia is the largest country in the world — it spans 11 time zones.' },
    { emoji: '🏝️', text: 'Indonesia has over 17,000 islands, making it the world\'s largest archipelago.' },
    { emoji: '🗺️', text: 'Vatican City is the smallest country in the world at just 0.44 km².' },
    { emoji: '🌊', text: 'Canada has the most lakes of any country — over 60% of the world\'s total.' },
    { emoji: '🏔️', text: 'Nepal is home to 8 of the world\'s 10 highest mountain peaks.' },
    { emoji: '🌵', text: 'The Sahara Desert in Africa is roughly the same size as the United States.' },
    { emoji: '🐧', text: 'Antarctica is the only continent with no permanent human residents.' },
    { emoji: '🌐', text: 'There are 195 countries in the world recognised by the United Nations.' },
    { emoji: '🏙️', text: 'Tokyo is the most populous metropolitan area on Earth, with over 37 million people.' },
    { emoji: '🌿', text: 'Brazil contains about 60% of the Amazon rainforest, the world\'s largest tropical forest.' },
    { emoji: '💧', text: 'The Nile River in Africa was historically considered the world\'s longest river at 6,650 km.' },
    { emoji: '🧭', text: 'France is the most visited country in the world, attracting nearly 90 million tourists per year.' },
    { emoji: '🏛️', text: 'Greece has more archaeological museums than any other country in the world.' },
    { emoji: '🎌', text: 'Japan has over 6,800 islands and is one of the world\'s most mountainous countries.' },
    { emoji: '🦁', text: 'Africa is the only continent that stretches from the northern to the southern temperate zones.' },
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