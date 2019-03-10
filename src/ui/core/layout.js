import React, { useContext } from 'react'
import {
  navigate
} from "@reach/router"
import { AccountLink } from '../components/account-link'
import { AuthContext } from './context/auth'


export const Layout = ({ children }) => {
  console.log('auth', AuthContext)
  console.log('useContext', useContext)
  const { state, dispatch } = useContext(AuthContext)
  console.log('state', state)
  return (
    <main>
      <header>
        <h1>The Conclave</h1>
        <nav>
          <ul>
            <li>
              {state.isLoggedIn ? (
                <><AccountLink
                  name={`${state.user.firstName} ${state.user.lastName}`}
                />
                <a href="" onClick={e=>{
                  e.preventDefault()
                  dispatch({type: 'logout'})
                }}>Logout</a>
                </>
              ) : (<>
                <a href="#" onClick={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}>Login</a> {' | '}
                <a href="#" onClick={(e) => {
                  e.preventDefault()
                  navigate('/register')
                }}>Register</a></>

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

export default Layout
