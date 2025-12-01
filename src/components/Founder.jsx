import React from 'react'
import SectionTitle from '../ui/SectionTitle'

// Content
const TITLE = "About the Founder"
const FOUNDER_NAME = "Chaman"
const FOUNDER_BIO = "Final-year student, builder, and clarity-obsessed founder. Building Parchai because genuine emotional clarity is missing from people's lives."
const FOUNDER_IMAGE = "/founder.jpg" // TODO: Replace with actual founder image

export default function Founder() {
    return (
        <section className="section section--grey">
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={FOUNDER_IMAGE}
                            alt={`${FOUNDER_NAME}, Founder of Parchai`}
                            style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                boxShadow: 'var(--shadow-lg)',
                                border: '4px solid #fff'
                            }}
                        />
                    </div>
                    <div className="text-center">
                        <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{FOUNDER_NAME}</h3>
                        <p style={{
                            fontSize: '20px',
                            lineHeight: '1.6',
                            fontStyle: 'italic',
                            color: '#333',
                            maxWidth: '600px'
                        }}>
                            "{FOUNDER_BIO}"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
