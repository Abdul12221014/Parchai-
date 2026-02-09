import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "Who Is It For?"
const PERSONAS = [
    {
        title: "Students",
        description: "Confused about streams, subjects, or career paths after 10th/12th."
    },
    {
        title: "College Students",
        description: "Stuck in placements, unsure about higher studies or switching fields."
    },
    {
        title: "Professionals",
        description: "Considering a career switch but overwhelmed by options and risks."
    },
    {
        title: "Exam Aspirants",
        description: "Caught in loops of JEE/NEET/UPSC preparation, questioning the path."
    },
    {
        title: "Anyone Lost",
        description: "Feeling stuck in life decisions and needing clarity on the next step."
    }
]

export default function WhoIsItFor() {
    return (
        <section className="section section--grey">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <div className="grid grid--3-col">
                    {PERSONAS.map((persona, index) => (
                        <div key={index} className="card text-center">
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                                {index === 0 ? '🎓' : index === 1 ? '🎒' : index === 2 ? '💼' : index === 3 ? '📚' : '🤔'}
                            </div>
                            <h3>{persona.title}</h3>
                            <p style={{ marginBottom: 0, fontSize: '15px' }}>{persona.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
