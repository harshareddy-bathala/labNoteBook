type ContentSkeletonProps = {
  type?: 'article' | 'card' | 'header'
}

export default function ContentSkeleton({ type = 'article' }: ContentSkeletonProps) {
  if (type === 'header') {
    return (
      <div className="animate-pulse" role="status" aria-label="Loading content">
        <div className="h-3 w-24 rounded bg-cream-line" />
        <div className="mt-4 h-12 w-3/4 rounded bg-cream-line sm:h-14" />
        <div className="mt-4 h-4 w-48 rounded bg-cream-line" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div className="animate-pulse border border-cream-line p-6" role="status" aria-label="Loading content">
        <div className="h-3 w-20 rounded bg-cream-line" />
        <div className="mt-4 h-6 w-3/4 rounded bg-cream-line" />
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-cream-line" />
          <div className="h-4 w-5/6 rounded bg-cream-line" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  // Default article skeleton
  return (
    <div className="animate-pulse space-y-8" role="status" aria-label="Loading article">
      {/* Intro paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-cream-line" />
        <div className="h-4 w-full rounded bg-cream-line" />
        <div className="h-4 w-4/5 rounded bg-cream-line" />
      </div>

      {/* Section heading */}
      <div className="h-8 w-1/3 rounded bg-cream-line" />

      {/* Paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-cream-line" />
        <div className="h-4 w-full rounded bg-cream-line" />
        <div className="h-4 w-3/4 rounded bg-cream-line" />
      </div>

      {/* Code block placeholder */}
      <div className="h-32 w-full rounded bg-ink/10" />

      {/* Another paragraph */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-cream-line" />
        <div className="h-4 w-5/6 rounded bg-cream-line" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}
