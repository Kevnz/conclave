import React, { useContext } from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import '@babel/polyfill'
import { AuthContext, AuthProvider } from '../auth'
import { Layout } from '../../layout'

const Thinger = () => {
  const { state, dispatch } = useContext(AuthContext)
  return (
    <div>
      <span>
        User: {state.user.firstName} {state.user.lastName}
      </span>
      {state.isLoggedIn ? (
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            dispatch({
              type: 'logout',
            })
          }}
        >
          Logout
        </a>
      ) : (
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            dispatch({
              type: 'login',
              payload: {
                firstName: 'Test',
                lastName: 'User',
                username: 'testuser',
              },
            })
          }}
        >
          Login
        </a>
      )}
    </div>
  )
}
function App() {
  return (
    <AuthProvider>
      <Thinger />
    </AuthProvider>
  )
}

function LayoutApp() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}
afterEach(cleanup)

describe('The Auth Context', () => {
  it('should render initial state data', () => {
    const { getByText } = render(<App />)
    expect(getByText(/^User:/)).toHaveTextContent('User: Anonymous User')
  })
  it('should render updated data on login', async done => {
    const { getByText } = render(<App />)
    expect(getByText(/^User:/)).toHaveTextContent('User: Anonymous User')
    fireEvent.click(getByText(/login/i))
    const loggedOut = await waitForElement(() => getByText(/^User:/))
    expect(loggedOut).toHaveTextContent('User: Test User')
    return done()
  })
  it('should render initial state data', () => {
    const { getByText } = render(<LayoutApp />)
    expect(getByText(/^Login/)).toHaveTextContent('Login')
  })
})
