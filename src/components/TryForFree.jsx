import React from 'react'
import Button from '../ui/Button'

// Content
const TITLE = "Try For Free"
const DESCRIPTION = "Join thousands of mentees who found their path with Parchai."
const TRUST_SIGNAL = "Clarity doesn't end with one conversation. We stay with you as your situation evolves."
const CTA_TEXT = "Find a Mentor Now"

export default function TryForFree() {
    return (
        <section className="section">
            <div className="container text-center">
                <h2 style={{ marginBottom: '16px' }}>{TITLE}</h2>
                <p style={{
                    fontSize: '18px',
                    maxWidth: '600px',
                    margin: '0 auto 16px'
                }}>
                    {DESCRIPTION}
                </p>
                <p style={{
                    fontSize: '15px',
                    color: 'var(--color-text-tertiary)',
                    maxWidth: '500px',
                    margin: '0 auto 28px',
                    fontStyle: 'italic'
                }}>
                    {TRUST_SIGNAL}
                </p>
                <Button
                    to="/mentors"
                    ariaLabel="Start your free clarity session"
                >
                    {CTA_TEXT}
                </Button>
            </div>
        </section>
    )
}
