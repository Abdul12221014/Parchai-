import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyItMatters from '../components/WhyItMatters';
import WhoIsItFor from '../components/WhoIsItFor';
import TryForFree from '../components/TryForFree';
import Contact from '../components/Contact';
import Founder from '../components/Founder';
import StatsStrip from '../components/StatsStrip';
import FeaturedMentors from '../components/FeaturedMentors';

export default function HomePage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Clean up state
                window.history.replaceState({}, document.title)
            }
        }
    }, [location]);

    return (
        <>
            <Hero />
            <StatsStrip />
            <FeaturedMentors />
            <div id="how-it-works"><HowItWorks /></div>
            <div id="why-parchai"><WhyItMatters /></div>
            <div id="stories"><WhoIsItFor /></div>
            <TryForFree />
            <div id="contact"><Contact /></div>
            <div id="founder"><Founder /></div>
        </>
    );
}
