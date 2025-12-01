import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "Why It Matters"
const POINTS = [
    "Most people don't need motivation — they need direction.",
    "Parents/relatives give advice, not understanding.",
    "AI gives answers, not emotional clarity.",
    "Parchai blends both: Human touch + AI insights."
]

export default function WhyItMatters() {
    return (
        <section className="section">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <div className="grid grid--4-col" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {POINTS.map((point, index) => (
                        <div key={index} className="card text-center" style={{ padding: '32px 24px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#E0E7FF',
                                color: '#4338CA',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                fontSize: '20px'
                            }}>
                                {index === 0 ? '🧭' : index === 1 ? '👂' : index === 2 ? '🤖' : '✨'}
                            </div>
                            <p style={{ marginBottom: 0, fontWeight: '500' }}>{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
