import { Link } from 'react-router-dom'

type BlogCardProps = {
  date: string
  title: string
  excerpt: string
  readTime: number
  href: string
  tags: string[]
}

export default function BlogCard({
  date,
  title,
  excerpt,
  readTime,
  href,
  tags,
}: BlogCardProps) {
  return (
    <Link
      to={href}
      className="group block mb-8 border-b border-cream-line pb-8 transition-colors duration-300 hover:border-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream-base"
    >
      <p className="font-mono text-xs text-ink-muted mb-2">
        {date}
      </p>

      <h3 className="font-display text-2xl text-ink leading-snug mb-3 transition-colors duration-300 group-hover:text-accent-red">
        {title}
      </h3>

      <p className="font-body text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">
        {excerpt}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cream-line px-2 py-0.5 font-mono text-[10px] text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-ink-muted">
          [ {readTime} min read ]
        </span>
        <span className="text-accent-red">
          →
        </span>
      </div>
    </Link>
  )
}
