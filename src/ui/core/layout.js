import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import withStyles from 'react-jss'
import { AccountLink } from '../components/account-link'
import { appStyles } from '../styles/app'
import { AuthContext } from './context/auth'

const BaseLayout = ({ children, classes }) => {
  const { state, dispatch } = useContext(AuthContext)
  return (
    <main className={classes.appBase}>
      <header>
        <h1>The Conclave</h1>
        <nav>
          <ul>
            <li>
              {state.isLoggedIn ? (
                <>
                  <AccountLink
                    name={`${state.user.firstName} ${state.user.lastName}`}
                  />
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault()
                      dispatch({ type: 'logout' })
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      navigate('/login')
                    }}
                  >
                    Login
                  </a>{' '}
                  {' | '}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      navigate('/register')
                    }}
                  >
                    Register
                  </a>
                </>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <div>{children}</div>
      </section>
    </main>
  )
}
export const Layout = withStyles(appStyles)(BaseLayout)

export default Layout
