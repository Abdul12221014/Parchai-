import React from 'react'
import Button from '../ui/Button'

// Content
const HEADLINE = "Find Clarity in Your Career"
const SUBHEADLINE = "Connect with top mentors for 1-on-1 guidance."
const CTA_TEXT = "Start Your Clarity Session"

export default function Hero() {
    return (
        <section className="hero" style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(59, 130, 246, 0.15), transparent 70%), linear-gradient(180deg, var(--color-bg-premium) 0%, var(--color-bg-subtle) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="hero__content fade-in delay-100" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{
                    fontSize: 'var(--font-size-h1)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: 'var(--spacing-base)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em'
                }}>{HEADLINE}</h1>
                <p className="hero__subheadline" style={{ fontSize: '1.25rem', opacity: 0.9 }}>{SUBHEADLINE}</p>
                <div className="fade-in delay-200" style={{ marginTop: '2rem' }}>
                    <Button
                        to="/mentors"
                        ariaLabel="Start your clarity session"
                        shimmer={true}
                    >
                        {CTA_TEXT}
                    </Button>
                </div>
            </div>
        </section>
    )
}
