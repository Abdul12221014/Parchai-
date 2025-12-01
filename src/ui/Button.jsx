import React from 'react'

/**
 * Reusable Button component
 * @param {string} children - Button text
 * @param {string} href - External link URL (renders as <a>)
 * @param {function} onClick - Click handler (renders as <button>)
 * @param {string} ariaLabel - Accessibility label
 * @param {boolean} shimmer - Applies a shimmer effect class
 * @param {string} className - Additional CSS classes
 */
export default function Button(props) {
    const baseClass = "btn"
    const shimmerClass = props.shimmer ? "btn--shimmer" : ""
    const className = `${baseClass} ${shimmerClass} ${props.className || ""}`.trim()

    if (props.href) {
        return (
            <a
                href={props.href}
                className={className}
                aria-label={props.ariaLabel || props.children}
                target="_blank"
                rel="noopener noreferrer"
            >
                {props.children}
            </a>
        )
    }

    return (
        <button
            onClick={props.onClick}
            className={className}
            aria-label={props.ariaLabel || props.children}
        >
            {props.children}
        </button>
    )
}

