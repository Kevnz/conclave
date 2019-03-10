import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

// eslint-disable-next-line no-undef
const token = localStorage.getItem('auth_token')

const middlewareLink = setContext(() => ({
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
}))

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
