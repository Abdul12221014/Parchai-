import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "What is Parchai?"
const DESCRIPTION = `Parchai is a clarity system that helps people understand their life situation and see all their possible paths clearly.

It's not coaching. It's not therapy.

It's a human-first decision mapping system where AI serves as an assistant — helping surface patterns, not prescribe paths. Human judgment and your autonomy remain central to every step.`

export default function WhatIsParchai() {
    return (
        <section className="section">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ whiteSpace: 'pre-line', fontSize: '18px' }}>{DESCRIPTION}</p>
                </div>
            </div>
        </section>
    )
}
