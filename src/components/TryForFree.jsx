import React from 'react'
import Button from '../ui/Button'

// Content
const TITLE = "Try For Free"
const DESCRIPTION = "Parchai is currently in early access. The first few clarity sessions are free."
const CTA_TEXT = "Start Your Clarity Session"
const GOOGLE_FORM_URL = "https://forms.gle/nFpEEZSKGkfwhkNm6"

export default function TryForFree() {
    return (
        <section className="section">
            <div className="container text-center">
                <h2 style={{ marginBottom: '24px' }}>{TITLE}</h2>
                <p style={{
                    fontSize: '18px',
                    maxWidth: '600px',
                    margin: '0 auto 32px'
                }}>
                    {DESCRIPTION}
                </p>
                <Button
                    href={GOOGLE_FORM_URL}
                    ariaLabel="Start your free clarity session"
                >
                    {CTA_TEXT}
                </Button>
            </div>
        </section>
    )
}
