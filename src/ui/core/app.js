import React, { Component, Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'
import client from './client'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Register = React.lazy(() => import('../features/register'))
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Fragment>
          <h1>Conclave</h1>
          <React.Suspense fallback={<div>Loading</div>}>
            <Router>
              <Home path="/" />
              <About path="/about" />
              <Contact path="/contact" />
              <Register path="/register" />
            </Router>
          </React.Suspense>
        </Fragment>
      </ApolloProvider>
    )
  }
}
