import React from 'react'
import Button from '../ui/Button'

// Content
const HEADLINE = "You don't need advice. You need clarity."
const SUBHEADLINE = "1-on-1 clarity sessions for people stuck in life or career decisions."
const CTA_TEXT = "Start Your Clarity Session"
const GOOGLE_FORM_URL = "https://forms.gle/nFpEEZSKGkfwhkNm6"

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__content fade-in delay-100">
                <h1>{HEADLINE}</h1>
                <p className="hero__subheadline">{SUBHEADLINE}</p>
                <div className="fade-in delay-200">
                    <Button
                        href={GOOGLE_FORM_URL}
                        ariaLabel="Start your clarity session by filling the intake form"
                        shimmer={true}
                    >
                        {CTA_TEXT}
                    </Button>
                </div>
            </div>
        </section>
    )
}
