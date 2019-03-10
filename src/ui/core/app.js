import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'
import client from './client'
import { Layout } from './layout'
import { AuthProvider } from './context/auth'
import { ErrorBoundary } from './boundry'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Register = React.lazy(() => import('../features/register'))
const Login = React.lazy(() => import('../features/login'))

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
