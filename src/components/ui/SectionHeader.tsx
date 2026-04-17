import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type SectionHeaderProps = {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-mono text-xs tracking-widest uppercase text-ink-muted mb-3">
        {label}
      </p>
      <h2 className="font-display text-5xl text-ink leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-sm text-ink-muted mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
