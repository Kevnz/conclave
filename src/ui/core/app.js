import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'
import client from './client'
import { Layout } from './layout'
import { AuthProvider } from './context/auth'
import { ErrorBoundary } from './boundary'
import './app.scss'
const About = React.lazy(() => import('../pages/about'))
const Home = React.lazy(() => import('../pages/home'))
const Contact = React.lazy(() => import('../pages/contact'))
const Register = React.lazy(() => import('../pages/register'))
const Login = React.lazy(() => import('../pages/login'))
const AddTopic = React.lazy(() => import('../features/add-topic'))
const AddPost = React.lazy(() => import('../features/add-post'))
const Topic = React.lazy(() => import('../pages/topic'))
export const App = () => {
  return (
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
                <Topic path="/topic/:topicId" />
                <AddTopic path="/topic/add" />
                <AddPost path="/topic/:topicId/post" />
              </Router>
            </React.Suspense>
          </ErrorBoundary>
        </Layout>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default hot(App)
