import React, { useContext } from 'react'
import { Form, TextBox, EmailInput, Button } from 'react-form-elements'

import { useMutation } from '@brightleaf/react-hooks/lib/use-mutation'
import { navigate } from '@reach/router'
import { AuthContext } from '../core/context/auth'

const REGISTER_MUTATION = `
  mutation Signup($newUserInput: NewUserInput!) {
    signup(newUserInput: $newUserInput) {
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

const RegisterForm = () => {
  const { error, loading, makeQuery, data } = useMutation(
    '/graphql',
    REGISTER_MUTATION
  )
  const { state, dispatch } = useContext(AuthContext)

  if (data && data.signup) {
    const { token, user } = data.signup

    dispatch({
      type: 'login',
      payload: { token, user },
    })
    navigate('/')
  }
  if (state.isLoggedIn) {
    return <div>Account already exists</div>
  }
  return (
    <main>
      {error && <div>Error</div>}
      {loading && <div>Loading</div>}
      <section>
        <h2>Create your account</h2>
        <div>
          <Form
            name="registerForm"
            onSubmit={({ firstName, lastName, email, password, username }) => {
              makeQuery({
                newUserInput: {
                  firstName,
                  lastName,
                  email,
                  password,
                  username,
                },
              })
            }}
          >
            <TextBox name="firstName" label="First Name" initialValue="" />
            <TextBox name="lastName" label="First Name" initialValue="" />
            <EmailInput
              type="email"
              name="email"
              label="Your Email"
              initialValue=""
            />
            <TextBox name="username" label="Username" initialValue="" />
            <TextBox
              name="password"
              label="Password"
              initialValue=""
              type="password"
            />
            <TextBox
              name="verifyPassword"
              label="Verify Password"
              initialValue=""
              type="password"
            />
            <Button>Register</Button>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default RegisterForm
