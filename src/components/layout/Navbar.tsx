import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'

type NavLink = {
  label: string
  path: string
}

const navLinks: NavLink[] = [
  { label: 'Experiments', path: '/experiments' },
  { label: 'Observations', path: '/observations' },
  { label: 'Field Work', path: '/field-work' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const desktopNavRef = useRef<HTMLElement | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [pillPosition, setPillPosition] = useState({ left: 0, width: 0 })
  const pillPositionRef = useRef(pillPosition)

  const activeIndex = navLinks.findIndex(
    (link) => location.pathname === link.path || location.pathname.startsWith(link.path + '/')
  )

  const targetIndex = hoveredIndex ?? activeIndex

  const updatePillPosition = useCallback(() => {
    if (targetIndex < 0) {
      return
    }

    const linkEl = linkRefs.current[targetIndex]
    const navEl = desktopNavRef.current

    if (!linkEl || !navEl) {
      return
    }

    const linkRect = linkEl.getBoundingClientRect()
    const navRect = navEl.getBoundingClientRect()
    const nextPosition = {
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    }

    if (
      Math.abs(pillPositionRef.current.left - nextPosition.left) < 0.5 &&
      Math.abs(pillPositionRef.current.width - nextPosition.width) < 0.5
    ) {
      return
    }

    pillPositionRef.current = nextPosition
    setPillPosition(nextPosition)
  }, [targetIndex])

  useEffect(() => {
    let rafId = 0

    const updateScrollState = () => {
      rafId = 0
      const nextScrolled = window.scrollY > 20
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
    }

    const handleScroll = () => {
      if (rafId) {
        return
      }

      rafId = requestAnimationFrame(updateScrollState)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [mobileMenuOpen])

  useLayoutEffect(() => {
    let rafId = 0

    const schedulePillUpdate = () => {
      if (rafId) {
        return
      }

      rafId = requestAnimationFrame(() => {
        rafId = 0
        updatePillPosition()
      })
    }

    schedulePillUpdate()

    const navEl = desktopNavRef.current
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(schedulePillUpdate)
        : null

    if (navEl && resizeObserver) {
      resizeObserver.observe(navEl)
    }

    const handleViewportChange = () => {
      schedulePillUpdate()
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('orientationchange', handleViewportChange)

    if ('fonts' in document) {
      void document.fonts.ready
        .then(() => {
          schedulePillUpdate()
        })
        .catch(() => {
          // Ignore font readiness errors; resize observer keeps underline in sync.
        })
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      resizeObserver?.disconnect()
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('orientationchange', handleViewportChange)
    }
  }, [location.pathname, updatePillPosition])

  const showPill = targetIndex >= 0

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed left-0 right-0 top-0 z-50 h-16 border-b bg-cream-base transition-colors duration-300 ${
          scrolled ? 'border-accent-red' : 'border-cream-line'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-14">
          <Link to="/" className="font-display text-xl text-ink no-underline">
            {profile.name}
          </Link>

          {/* Desktop Navigation */}
          <nav
            ref={desktopNavRef}
            className="hidden md:flex items-center gap-8 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(null)}
                className={`py-4 font-ui text-sm no-underline transition-colors duration-200 ${
                  activeIndex === index ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={profile.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 font-ui text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
            >
              Resume ↗
            </a>

            {/* Sliding Pill Underline */}
            <motion.div
              animate={{
                left: pillPosition.left,
                width: pillPosition.width,
                opacity: showPill ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute bottom-0 h-0.5 bg-accent-red"
            />
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="text-ink"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-base"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 bg-transparent border-none cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="text-ink"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setHoveredIndex(null)
                    setMobileMenuOpen(false)
                  }}
                  className={`font-display text-4xl no-underline ${
                    location.pathname === link.path ? 'text-accent-red' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl text-ink no-underline"
              >
                Resume ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
