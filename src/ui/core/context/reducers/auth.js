import { useLocalStorage } from 'react-use'

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

export const useAuthHook = () => {
  const [authToken, setAuthToken] = useLocalStorage('auth_token')
  const [authUser, setAuthUser] = useLocalStorage(
    'auth_user',
    initialState.user
  )

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
  return { authToken, authUser, reducer }
}
