import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false)
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__container">
                <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/logo-full.png" alt="Parchai" />
                </div>

                {/* Desktop Menu */}
                <div className="navbar__menu">
                    <button onClick={() => scrollToSection('how-it-works')} className="navbar__link">How it Works</button>
                    <button onClick={() => scrollToSection('why-parchai')} className="navbar__link">Why Parchai</button>
                    <button onClick={() => scrollToSection('stories')} className="navbar__link">Stories</button>
                    <button onClick={() => scrollToSection('contact')} className="navbar__link">Contact</button>
                    <button onClick={() => scrollToSection('founder')} className="navbar__link">About Founder</button>
                </div>

                <div className="navbar__cta">
                    <Button
                        href="https://forms.gle/nFpEEZSKGkfwhkNm6"
                        ariaLabel="Start Session"
                        shimmer={true}
                    >
                        Start Session
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="navbar__toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
                </button>

                {/* Mobile Menu */}
                <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <button onClick={() => scrollToSection('how-it-works')} className="navbar__mobile-link">How it Works</button>
                    <button onClick={() => scrollToSection('why-parchai')} className="navbar__mobile-link">Why Parchai</button>
                    <button onClick={() => scrollToSection('stories')} className="navbar__mobile-link">Stories</button>
                    <button onClick={() => scrollToSection('contact')} className="navbar__mobile-link">Contact</button>
                    <button onClick={() => scrollToSection('founder')} className="navbar__mobile-link">About Founder</button>
                    <div style={{ marginTop: '24px' }}>
                        <Button
                            href="https://forms.gle/nFpEEZSKGkfwhkNm6"
                            ariaLabel="Start Session"
                        >
                            Start Session
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
