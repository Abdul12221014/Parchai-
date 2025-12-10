import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Reusable Button component
 * @param {string} children - Button text
 * @param {'primary'|'secondary'|'danger'} [variant='primary'] - Button style variant
 * @param {'sm'|'md'|'lg'} [size='md'] - Button size
 * @param {string} [className=''] - Additional CSS classes
 * @param {string} href - External link URL (renders as <a>)
 * @param {string} to - Internal link URL (renders as <Link>)
 * @param {function} onClick - Click handler
 * @param {'button'|'submit'|'reset'} [type='button'] - Button type for <button> element
 * @param {boolean} [disabled=false] - Disables the button
 * @param {boolean} [shimmer=false] - Applies a shimmer effect class
 * @param {string} ariaLabel - Accessibility label
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    to,
    onClick,
    type = 'button',
    disabled = false,
    shimmer = false,
    ariaLabel
}) {
    const baseClass = `btn btn--${variant} btn--${size} ${shimmer ? 'btn--shimmer' : ''} ${className}`

    if (to) {
        return (
            <Link
                to={to}
                className={baseClass}
                aria-label={ariaLabel || children}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    }

    if (href) {
        return (
            <a
                href={href}
                className={baseClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel || children}
                onClick={onClick}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            type={type}
            className={baseClass}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || children}
        >
            {children}
        </button>
    )
}
