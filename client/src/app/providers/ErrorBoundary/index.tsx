import { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorPage } from '../../../pages/ErrorPage'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    console.log(hasError, 'hasError')
    console.log(children, 'children')

    if (hasError) {
      return <ErrorPage />
    }

    return children
  }
}

export default ErrorBoundary;
