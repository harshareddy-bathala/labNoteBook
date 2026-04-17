import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Link } from 'react-router-dom'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[50vh] items-center justify-center bg-cream-base px-8 text-center">
          <div className="w-full max-w-lg">
            <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent-red">
              [ ERROR ]
            </p>

            <h2 className="mt-4 font-display text-[32px] leading-[1.1] text-ink sm:text-[40px]">
              Something went wrong
            </h2>

            <p className="mx-auto mt-4 max-w-[36ch] font-body text-[15px] leading-[1.7] text-ink-muted">
              We encountered an error while rendering this content. Please try refreshing the page.
            </p>

            {this.state.error && (
              <div className="mt-6 border border-cream-line bg-cream-surface p-4 text-left">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  Error Details
                </p>
                <p className="mt-2 break-words font-mono text-[12px] leading-[1.5] text-ink-muted">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex min-h-[44px] items-center justify-center border border-ink bg-ink px-6 font-mono text-[12px] uppercase tracking-widest text-cream-base transition-colors duration-200 hover:bg-ink/90"
              >
                Refresh Page
              </button>

              <Link
                to="/"
                className="inline-flex min-h-[44px] items-center font-mono text-[12px] text-accent-red transition-colors duration-200 hover:text-ink"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
