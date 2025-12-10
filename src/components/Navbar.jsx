import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false)
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } })
        } else {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
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
                    <Link
                        to="/mentors"
                        className="btn btn--primary btn--full"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book a Session
                    </Link>
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
                        <Link to="/mentors" className="btn btn--primary btn--sm">
                            Book a Session
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
