import React, { useContext } from 'react'
import { Form, TextBox, Password, Button } from 'react-form-elements'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { navigate } from '@reach/router'
import { AuthContext } from '../core/context/auth'

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token,
      user {
        id,
        firstName,
        lastName,
        username,
        email
      }
    }
  }
`

export const LoginPage = () => {
  const loginUser = useMutation(LOGIN_MUTATION)
  const { state, dispatch } = useContext(AuthContext)
  return (
    <main>
      <Form
        name="loginForm"
        onSubmit={formData => {
          loginUser({
            update: (proxy, mutationResult) => {
              console.info('prox', proxy)
              console.info('mutie', mutationResult)
              const { token, user } = mutationResult.data.login

              dispatch( {
                type: 'login',
                payload: { token, user }
              })
              navigate('/')
            },
            variables: { loginInput: formData }
          })

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