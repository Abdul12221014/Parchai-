import React from 'react'
import Button from '../ui/Button'

// Content
const TITLE = "Try For Free"
const DESCRIPTION = "Join thousands of mentees who found their path with Parchai."
const CTA_TEXT = "Find a Mentor Now"

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
                    to="/mentors"
                    ariaLabel="Start your free clarity session"
                >
                    {CTA_TEXT}
                </Button>
            </div>
        </section>
    )
}
