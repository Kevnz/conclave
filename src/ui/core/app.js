import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'
import client from './client'
import { Layout } from './layout'
import { AuthProvider } from './context/auth'
import { ErrorBoundary } from './boundary'

const About = React.lazy(() => import('../pages/about'))
const Home = React.lazy(() => import('../pages/home'))
const Contact = React.lazy(() => import('../pages/contact'))
const Register = React.lazy(() => import('../pages/register'))
const Login = React.lazy(() => import('../pages/login'))

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <AuthProvider>
          <Layout>
            <ErrorBoundary>
              <React.Suspense fallback={<div>Loading</div>}>
                <Router>
                  <Home path="/" />
                  <About path="/about" />
                  <Contact path="/contact" />
                  <Register path="/register" />
                  <Login path="/login" />
                </Router>
              </React.Suspense>
            </ErrorBoundary>
          </Layout>
        </AuthProvider>
      </ErrorBoundary>
    </ApolloProvider>
  )
}

export default hot(App)
