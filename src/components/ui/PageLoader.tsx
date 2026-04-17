export default function PageLoader() {
  return (
    <div 
      className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-cream-base"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-accent-red/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-accent-red/40" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
