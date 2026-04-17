/**
 * Shared animation configuration for consistent motion across the app.
 * All durations are in seconds.
 */

// Standard easing curve - smooth deceleration
export const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Animation durations
export const duration = {
  fast: 0.2,      // Micro-interactions, hover states
  normal: 0.3,    // Standard transitions
  medium: 0.45,   // Page elements, cards
  slow: 0.65,     // Reveal animations, sections
} as const

// Common transition presets
export const transition = {
  fast: { duration: duration.fast, ease: easing },
  normal: { duration: duration.normal, ease: easing },
  medium: { duration: duration.medium, ease: easing },
  slow: { duration: duration.slow, ease: easing },
} as const

// Reveal animation variants
export const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
} as const

// Fade animation variants
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const

// Stagger children delay
export const staggerChildren = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const
