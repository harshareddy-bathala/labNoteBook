import { type ReactNode, useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import Lenis from 'lenis'

interface ScrollProviderProps {
  children: ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const location = useLocation()
  const navigationType = useNavigationType()
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const destroyLenis = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }

    const isEligibleRoute = location.pathname === '/' || location.pathname === '/about'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (!isEligibleRoute || prefersReducedMotion || isCoarsePointer) {
      destroyLenis()
      return destroyLenis
    }

    destroyLenis()

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return destroyLenis
  }, [location.pathname])

  useEffect(() => {
    // Only reset scroll on PUSH navigation (new pages)
    // POP navigation (back/forward) should preserve browser's scroll restoration
    if (navigationType !== 'PUSH') {
      return
    }

    const lenis = lenisRef.current

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, navigationType])

  return <>{children}</>
}
