import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusTag from './StatusTag'

type LedgerRowProps = {
  id: string
  title: string
  description: string
  status: 'active' | 'paused' | 'archived' | 'published' | 'draft'
  year: number
  tags: string[]
  href: string
  index?: number
}

const MotionLink = motion.create(Link)

export default function LedgerRow({
  id,
  title,
  description,
  status,
  year,
  tags,
  href,
  index = 0,
}: LedgerRowProps) {
  return (
    <MotionLink
      to={href}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group block w-full cursor-pointer border-b border-cream-line px-4 py-5 no-underline transition-colors duration-200 hover:bg-cream-line/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red lg:py-6"
    >
      <div className="w-full md:hidden">
        <h3 className="truncate font-display text-[28px] leading-[1.08] text-ink">
          {title}
        </h3>

        <div className="mt-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="shrink-0 font-mono text-[11px] text-ink-muted">
              {id}
            </span>
            <StatusTag status={status} />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-[11px] text-ink-muted">
              {year}
            </span>
            <span className="text-accent-red opacity-60">
              →
            </span>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 font-body text-[14px] leading-[1.55] text-ink-muted">
          {description}
        </p>
      </div>

      <div className="hidden w-full items-center gap-6 md:flex">
        <span className="font-mono text-xs text-ink-muted w-20 shrink-0">
          {id}
        </span>

        <h3 className="flex-1 font-display text-xl text-ink">
          {title}
        </h3>

        <p className="hidden lg:block font-body text-sm text-ink-muted flex-1 truncate">
          {description}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <StatusTag status={status} />

          <span className="font-mono text-xs text-ink-muted">
            {year}
          </span>

          <div className="hidden md:flex items-center gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={`${id}-${tag}-${tagIndex}`}
                className="border border-cream-line font-mono text-xs px-2 py-0.5 text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-accent-red opacity-60">
            →
          </span>
        </div>
      </div>
    </MotionLink>
  )
}
