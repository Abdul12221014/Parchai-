import React from 'react'
import Hero from './components/Hero'
import WhatIsParchai from './components/WhatIsParchai'
import HowItWorks from './components/HowItWorks'
import WhyItMatters from './components/WhyItMatters'
import WhoIsItFor from './components/WhoIsItFor'
import TryForFree from './components/TryForFree'
import Founder from './components/Founder'
import Contact from './components/Contact'

import Navbar from './components/Navbar'

// TODO: Add Google Tag Manager / Analytics script initialization here
// Example: useEffect(() => { window.dataLayer = window.dataLayer || []; ... }, [])

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <div id="how-it-works"><HowItWorks /></div>
            <div id="why-parchai"><WhyItMatters /></div>
            <div id="stories"><WhoIsItFor /></div>
            <TryForFree />
            <div id="contact"><Contact /></div>
            <div id="founder"><Founder /></div>

            <footer className="footer">
                <div className="container">
                    <div className="footer__grid">
                        <div className="footer__brand">
                            <img src="/logo-full.png" alt="Parchai" style={{ height: '28px', opacity: 0.8 }} />
                            <p>The emotional OS for the next generation. Helping you find clarity in a confused world.</p>
                        </div>

                        <div className="footer__col">
                            <h4>Company</h4>
                            <ul className="footer__links">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>

                        <div className="footer__col">
                            <h4>Resources</h4>
                            <ul className="footer__links">
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Clarity Guide</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer__col">
                            <h4>Legal</h4>
                            <ul className="footer__links">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer__bottom">
                        <p>© 2025 Parchai — All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="Instagram">Instagram</a>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default App
