import React from 'react'

/**
 * Section title component with subtle divider
 * @param {string} children - Title text
 */
export default function SectionTitle({ children }) {
    return (
        <h2 className="section-title">
            {children}
        </h2>
    )
}
