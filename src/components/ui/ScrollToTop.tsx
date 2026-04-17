import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    const updateVisibility = () => {
      rafIdRef.current = 0
      const shouldBeVisible = window.scrollY > 400
      setIsVisible((current) => (current === shouldBeVisible ? current : shouldBeVisible))
    }

    const handleScroll = () => {
      if (rafIdRef.current) return
      rafIdRef.current = requestAnimationFrame(updateVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 flex items-center justify-center bg-ink text-cream-base rounded-full shadow-lg hover:bg-ink/90 transition-colors"
          aria-label="Scroll to top"
        >
          <span className="text-lg">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
