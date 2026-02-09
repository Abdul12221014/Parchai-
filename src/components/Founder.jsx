import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "About the Founder"
const FOUNDER_NAME = "Chaman"
const FOUNDER_BIO = "Final-year student, builder, and clarity-obsessed founder. Building Parchai because genuine emotional clarity is missing from people's lives."
const FOUNDER_IMAGE = "/founder.jpg"

export default function Founder() {
    return (
        <section className="founder-section">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <div className="founder-content">
                    <div className="founder-image-container">
                        <img
                            src={FOUNDER_IMAGE}
                            alt={`${FOUNDER_NAME}, Founder of Parchai`}
                            className="founder-image"
                        />
                    </div>
                    <div className="founder-text">
                        <h3 className="founder-name">{FOUNDER_NAME}</h3>
                        <p className="founder-bio">
                            "{FOUNDER_BIO}"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
