import React, { useState, useEffect, useRef } from 'react';

export default function StatsStrip() {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ sessions: 0, mentors: 0, rating: 0 });
    const sectionRef = useRef(null);

    const stats = [
        { label: 'Sessions Booked', value: 500, suffix: '+', key: 'sessions' },
        { label: 'Expert Mentors', value: 50, suffix: '+', key: 'mentors' },
        { label: 'Average Rating', value: 4.9, suffix: '/5', key: 'rating', decimals: 1 },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                sessions: Math.floor(stats[0].value * progress),
                mentors: Math.floor(stats[1].value * progress),
                rating: parseFloat((stats[2].value * progress).toFixed(1))
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setCounts({
                    sessions: stats[0].value,
                    mentors: stats[1].value,
                    rating: stats[2].value
                });
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="section" style={{
            background: 'var(--color-bg-subtle)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
            padding: 'var(--spacing-lg) 0'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '0.5rem',
                                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
                            }}>
                                {counts[stat.key]}{stat.suffix}
                            </div>
                            <div style={{
                                color: 'var(--color-grey-400)',
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
