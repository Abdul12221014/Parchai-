import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "How It Works"
const STEPS = [
    {
        number: "1",
        title: "Fill the form",
        description: "Share your story, confusion, and what you've tried so far."
    },
    {
        number: "2",
        title: "Talk to a clarity guide",
        description: "1-on-1 conversation via WhatsApp, call, or video to understand your situation deeply."
    },
    {
        number: "3",
        title: "Receive your Clarity Map",
        description: "Get a personalized PDF showing 3-5 possible paths with pros, cons, risks, and emotional impact."
    },
    {
        number: "4",
        title: "Follow-up after 7 days",
        description: "Check-in to see how you're progressing and answer any new questions."
    }
]

export default function HowItWorks() {
    return (
        <section className="section section--grey" id="how-it-works">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>

                <div className="steps-container">
                    {/* Connecting Line (Desktop) */}
                    <div className="steps-line"></div>

                    <div className="grid grid--4-col">
                        {STEPS.map((step) => (
                            <div key={step.number} className="step-card text-center">
                                <div className="step-number">
                                    {step.number}
                                </div>
                                <h3>{step.title}</h3>
                                <p style={{ marginBottom: 0 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
