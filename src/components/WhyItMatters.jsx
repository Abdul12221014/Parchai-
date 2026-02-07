import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import { Compass, Ear, Bot, Sparkles } from 'lucide-react';

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
                <div className="why-it-matters__grid">
                    {POINTS.map((point, index) => {
                        const icon = index === 0 ? <Compass size={24} /> :
                            index === 1 ? <Ear size={24} /> :
                                index === 2 ? <Bot size={24} /> :
                                    <Sparkles size={24} />;

                        return (
                            <div key={index} className="card text-center" style={{ padding: '32px 24px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#3b82f6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
                                }}>
                                    {icon}
                                </div>
                                <p style={{ marginBottom: 0, fontWeight: '500' }}>{point}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
