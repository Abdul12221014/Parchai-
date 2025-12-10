import React from 'react';

export default function StatsStrip() {
    const stats = [
        { label: 'Sessions Booked', value: '500+' },
        { label: 'Expert Mentors', value: '50+' },
        { label: 'Average Rating', value: '4.9/5' },
    ];

    return (
        <section className="section" style={{
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
                                color: 'var(--color-accent)',
                                marginBottom: '0.5rem'
                            }}>
                                {stat.value}
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
