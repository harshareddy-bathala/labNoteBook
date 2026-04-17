type StatusValue = 'active' | 'paused' | 'archived' | 'published' | 'draft'

type StatusTagProps = {
  status: StatusValue
}

export default function StatusTag({ status }: StatusTagProps) {
  const colorClass =
    status === 'active' || status === 'published'
      ? 'text-accent-green'
      : 'text-ink-muted'

  return (
    <span className={`font-mono text-xs ${colorClass}`}>
      [ {status} ]
    </span>
  )
}
