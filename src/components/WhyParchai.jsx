import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import { User, Heart, RefreshCw, Shield, Clock } from 'lucide-react';

// Content - Built for Clarity, Not Advice
const TITLE = "Built for Clarity, Not Advice"
const SUBTITLE = "How Parchai approaches clarity internally"
const VALUES = [
    {
        icon: User,
        text: "We understand the person first, not just the problem"
    },
    {
        icon: Heart,
        text: "Human-first, AI-assisted — technology serves empathy"
    },
    {
        icon: RefreshCw,
        text: "Iterative clarity that evolves with your situation"
    },
    {
        icon: Shield,
        text: "Your autonomy remains central — we guide, not decide"
    },
    {
        icon: Clock,
        text: "Long-term support that continues beyond sessions"
    }
]

export default function WhyParchai() {
    return (
        <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <p style={{
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '15px'
                }}>
                    {SUBTITLE}
                </p>
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    {VALUES.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px 0',
                                    borderBottom: index < VALUES.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(59, 130, 246, 0.08)',
                                    color: 'var(--color-accent)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <IconComponent size={18} />
                                </div>
                                <p style={{
                                    marginBottom: 0,
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '16px',
                                    lineHeight: '1.6'
                                }}>
                                    {value.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
