import React, { useContext } from 'react'
import { Form, TextBox, Password, Button } from 'react-form-elements'
import { useMutation } from '@brightleaf/react-hooks'
import { navigate } from '@reach/router'
import { AuthContext } from '../core/context/auth'

const LOGIN_MUTATION = `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`

export const LoginPage = () => {
  const { error, loading, makeQuery, data } = useMutation(
    'http://localhost:8081/graphql',
    LOGIN_MUTATION
  )
  const { state, dispatch } = useContext(AuthContext)

  if (state.isLoggedIn) {
    return <div>Already logged in</div>
  }
  if (data && data.login) {
    const { token, user } = data.login

    dispatch({
      type: 'login',
      payload: { token, user },
    })
    navigate('/')
  }

  return (
    <main>
      {error && <div>Error</div>}
      {loading && <div>Loading</div>}
      <Form
        name="loginForm"
        onSubmit={formData => {
          makeQuery({ loginInput: formData })
        }}
      >
        <TextBox type="email" label="Email" name="email" />
        <Password label="Password" name="password" />
        <Button>Login</Button>
      </Form>
    </main>
  )
}

export default LoginPage
