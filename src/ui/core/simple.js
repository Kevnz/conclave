import React, { useContext } from 'react'
import { AuthContext, AuthProvider } from './context/auth'

const Thinger = () => {
  const { state, dispatch } = useContext(AuthContext)
  console.log('ob', { state, dispatch })
  return (
    <div>
      <h1>
        User {state.user.firstName} {state.user.lastName}
      </h1>
      {state.isLoggedIn ? (
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            console.log('ob', { state, dispatch })
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
            console.log('ob', { state, dispatch })
            dispatch({
              type: 'login',
              payload: {
                firstName: 'Code',
                lastName: 'Sandbox',
                username: 'CodeSandbox.io',
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
      <div className="App">
        <Thinger />
      </div>
    </AuthProvider>
  )
}

export default App
