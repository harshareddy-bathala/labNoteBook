import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  })

  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-cream-base px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-ink-muted">
          [ ERROR 404 ]
        </p>

        <h1 className="mt-5 font-display text-[72px] leading-[1] text-ink sm:text-[96px]">
          404
        </h1>

        <p className="mt-4 font-display text-[28px] leading-[1.2] text-ink sm:text-[36px]">
          Page Not Found
        </p>

        <p className="mx-auto mt-4 max-w-[32ch] font-body text-[16px] leading-[1.7] text-ink-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center border border-ink bg-ink px-6 font-mono text-[12px] uppercase tracking-widest text-cream-base transition-colors duration-200 hover:bg-ink/90"
          >
            ← Back to Home
          </Link>

          <Link
            to="/experiments"
            className="inline-flex min-h-[44px] items-center font-mono text-[12px] text-accent-red transition-colors duration-200 hover:text-ink"
          >
            → View Experiments
          </Link>
        </div>

        <div className="mt-12 border-t border-cream-line pt-6">
          <p className="font-mono text-[11px] text-ink-muted">
            Lost? Try checking the URL or navigate using the links above.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
