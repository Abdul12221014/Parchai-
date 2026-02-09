import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import { Compass, Ear, Bot, Sparkles, User, Heart, RefreshCw, Shield, Clock } from 'lucide-react';

// Merged Section: Why Parchai Exists
const TITLE = "Why Parchai Exists"
const INTRO_TEXT = "In a world full of noise, clarity is your greatest ally. Most people aren't confused because they lack intelligence — they're overwhelmed by opinions, pressure, and urgency."
const POINTS = [
    "Most people don't need motivation — they need direction.",
    "Parents/relatives give advice, not understanding.",
    "AI gives answers, not emotional clarity.",
    "Parchai blends both: Human touch + AI insights."
]

const VALUES = [
    { icon: User, text: "We understand the person first, not just the problem" },
    { icon: Heart, text: "Human-first, AI-assisted — technology serves empathy" },
    { icon: RefreshCw, text: "Iterative clarity that evolves with your situation" },
    { icon: Shield, text: "Your autonomy remains central — we guide, not decide" },
    { icon: Clock, text: "Long-term support that continues beyond sessions" }
]

export default function WhyItMatters() {
    return (
        <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
            <div className="container">
                <SectionTitle>{TITLE}</SectionTitle>
                <p style={{
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto 2.5rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '17px',
                    lineHeight: '1.7',
                    fontStyle: 'italic'
                }}>
                    {INTRO_TEXT}
                </p>

                {/* 2x2 Grid of core insights */}
                <div className="grid grid--2-col" style={{ marginBottom: '3rem' }}>
                    {POINTS.map((point, index) => {
                        const icon = index === 0 ? <Compass size={24} /> :
                            index === 1 ? <Ear size={24} /> :
                                index === 2 ? <Bot size={24} /> :
                                    <Sparkles size={24} />;

                        return (
                            <div key={index} className="card text-center" style={{ padding: '28px 24px' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#3b82f6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    boxShadow: '0 0 12px rgba(59, 130, 246, 0.2)'
                                }}>
                                    {icon}
                                </div>
                                <p style={{ marginBottom: 0, fontWeight: '500', fontSize: '15px' }}>{point}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Built for Clarity values */}
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px 32px',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                }}>
                    <h3 style={{
                        textAlign: 'center',
                        marginBottom: '24px',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)'
                    }}>
                        Built for Clarity, Not Advice
                    </h3>
                    {VALUES.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '14px',
                                    padding: '12px 0',
                                    borderBottom: index < VALUES.length - 1 ? '1px solid rgba(59, 130, 246, 0.08)' : 'none'
                                }}
                            >
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(59, 130, 246, 0.06)',
                                    color: 'var(--color-accent)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <IconComponent size={16} />
                                </div>
                                <p style={{
                                    marginBottom: 0,
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '15px',
                                    lineHeight: '1.5'
                                }}>
                                    {value.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
