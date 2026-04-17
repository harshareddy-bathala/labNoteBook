import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useRevealOnce } from '../../hooks/useRevealOnce'

const socialLinks = [
  { label: 'Email', href: 'mailto:harshareddy.bathala@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/harshareddy-bathala' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/harshareddy19' },
  { label: 'Instagram', href: 'https://instagram.com/soltrlx' },
]

export default function Footer() {
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useRevealOnce(textRef, {
    rootMargin: '0px 0px -64px 0px',
    threshold: 0.08,
  })

  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <footer className="relative h-[calc(100svh-4rem)] overflow-x-hidden bg-ink">
      <div className="flex h-full flex-col justify-end px-4 pb-6 sm:px-8 sm:pb-8 md:pl-14 md:pr-8">
        <motion.div
          ref={textRef}
          className="max-w-full overflow-visible pb-[0.12em] pt-[0.08em]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.7, ease: easing, delay: 0 }}
            className="font-display leading-[1.08] text-cream-base"
            style={{ fontSize: 'clamp(36px, 14vw, 180px)' }}
          >
            Still
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.15 }}
            className="font-display leading-[1.08] text-cream-base break-words"
            style={{ fontSize: 'clamp(36px, 14vw, 180px)' }}
          >
            <span>Experimenting</span>
            <span className="text-accent-red">.</span>
          </motion.div>
        </motion.div>

        <div className="mt-8 border-t border-ink-dark pt-6 sm:mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center font-mono text-[11px] text-cream-base/85 sm:text-xs">
            {socialLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-x-6">
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="transition-colors hover:text-cream-base"
                >
                  {link.label}
                </a>
                {index < socialLinks.length - 1 && (
                  <span className="hidden text-cream-base/50 sm:inline">·</span>
                )}
              </span>
            ))}
          </div>

          <p className="mt-3 pb-4 text-center font-mono text-[11px] text-cream-base/70">
            © Harsha Reddy — Ongoing
          </p>
        </div>
      </div>
    </footer>
  )
}
