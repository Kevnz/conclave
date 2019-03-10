import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error('The Error that happend', error)
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error('info', info)
    console.error('catched err', error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log('error state', this.props.children)
      return <h1>Something went wrong.</h1>
    }
    console.log('NO ERROR?')
    return this.props.children
  }
}

export default ErrorBoundary
