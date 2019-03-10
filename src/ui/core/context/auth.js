import React, { createContext, useReducer, useEffect } from 'react'
import {useLocalStorage} from 'react-use'
const initialState = {
  isLoggedIn: false,
  loggingIn: false,
  user: {
    id: 0,
    firstName: 'Anonymous',
    lastName: 'User',
    email: '',
    username: 'Anonymous_User',
  },
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useLocalStorage('auth_token')
  const [authUser, setAuthUser] = useLocalStorage('auth_user', initialState.user)

  let reducer = (state, action) => {
    switch (action.type) {
      case 'login':

        const { token, user } = action.payload

        setAuthToken(token)
        setAuthUser(user)

        return { isLoggedIn: true, user: user }
      case 'logout':
        setAuthToken(null)
        setAuthUser(null)
        return initialState
      default:
        return null
    }
  }

  const hyrdatedState = authToken ? {
    isLoggedIn: true,
    loggingIn: false,
    user: authUser
  } : initialState

  const [state, dispatch] = useReducer(reducer, hyrdatedState)
  useEffect(
    () => {
      if (state && state.loggingIn) {
        console.info('logging in')
      }
    },
    [state.loggingIn]
  )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
