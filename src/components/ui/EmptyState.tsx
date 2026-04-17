interface EmptyStateProps {
  id: string
  label: string
  message: string
  hint?: string
}

export default function EmptyState({ id, label, message, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </p>
      <p className="mt-4 font-display text-2xl text-ink">
        {message}
      </p>
      {hint && (
        <p className="mt-3 font-mono text-xs text-ink-muted max-w-sm">
          {hint}
        </p>
      )}
      <div className="mt-8 font-mono text-[11px] text-ink-muted border border-cream-line px-4 py-2">
        {id}
      </div>
    </div>
  )
}
