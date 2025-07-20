import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-white text-2xl mb-4">Something went wrong</h2>
              <p className="text-red-500 mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Try again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary