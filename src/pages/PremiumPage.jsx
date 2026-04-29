import React, { useState } from 'react'
import '../styles/_premium.scss'

const FEATURES_FREE = [
    'Interactive world map',
    'Mark visited countries (Been)',
    'Wishlist countries (Wish)',
    'Country search',
    'Rate visited countries',
    'Basic achievements',
]

const FEATURES_PREMIUM = [
    'Detailed travel statistics & charts',
    'Travel heatmap by continent',
    'Travel timeline & journal',
    'Exclusive premium achievements',
    'Custom map color themes',
    'Export map as image or PDF',
    'Share your travel profile',
    'Cloud sync across devices',
    'No ads, ever',
]

const PLANS = [
    { id: 'monthly',  label: 'Monthly',  price: '4.99', period: '/ month',    note: null,                    popular: false },
    { id: 'yearly',   label: 'Yearly',   price: '2.99', period: '/ month',    note: 'Billed €35.88 / year',  badge: 'Save 40%', popular: true  },
    { id: 'lifetime', label: 'Lifetime', price: '49',   period: 'one-time',   note: 'Pay once, own forever', popular: false },
]

function PremiumPage({ mode }) {
    const [selected, setSelected] = useState('yearly')
    const isWish = mode === 'wish'

    return (
        <div className="premium-page">
            <div className="premium-scroll">


                <div className="premium-hero">
                    <div className={`premium-hero-badge ${isWish ? 'wish' : ''}`}>PREMIUM</div>
                    <h1 className={`premium-hero-title ${isWish ? 'wish' : ''}`}>Unlock the full world</h1>
                    <p className="premium-hero-sub">
                        Take your travel tracking to the next level with powerful tools and beautiful visualisations.
                    </p>
                </div>


                <div className="premium-comparison">
                    <div className="prem-col prem-col-free">
                        <div className="prem-col-header">
                            <span className="prem-col-title">Free</span>
                        </div>
                        <ul className="prem-feature-list">
                            {FEATURES_FREE.map((f, i) => (
                                <li key={i} className="prem-feature-item">
                                    <span className="prem-feature-dot" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`prem-col prem-col-premium ${isWish ? 'wish' : ''}`}>
                        <div className="prem-col-header">
                            <span className="prem-col-title">Premium</span>
                            <span className="prem-col-price">Everything +</span>
                        </div>
                        <ul className="prem-feature-list">
                            {FEATURES_PREMIUM.map((f, i) => (
                                <li key={i} className="prem-feature-item prem-feature-premium">
                                    <span className="prem-feature-dot" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="premium-plans">
                    <div className="premium-plans-title">Choose your plan</div>
                    <div className="plans-grid">
                        {PLANS.map(plan => (
                            <div
                                key={plan.id}
                                className={`plan-card ${selected === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''} ${isWish ? 'wish' : ''}`}
                                onClick={() => setSelected(plan.id)}
                            >
                                {plan.badge && <div className={`plan-badge ${isWish ? 'wish' : ''}`}>{plan.badge}</div>}
                                <div className="plan-label">{plan.label}</div>
                                <div className="plan-price-row">
                                    <span className={`plan-price ${isWish ? 'wish' : ''}`}>€{plan.price}</span>
                                    <span className="plan-period">{plan.period}</span>
                                </div>
                                {plan.note && <div className="plan-note">{plan.note}</div>}
                                <div className={`plan-radio ${selected === plan.id ? 'checked' : ''} ${isWish ? 'wish' : ''}`} />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="premium-cta">
                    <button className={`premium-cta-btn ${isWish ? 'wish' : ''}`}>
                        <span className="premium-cta-text">Get Premium</span>
                    </button>
                    <p className="premium-cta-note">Cancel anytime · Secure payment · No hidden fees</p>
                </div>

            </div>
        </div>
    )
}

export default PremiumPage