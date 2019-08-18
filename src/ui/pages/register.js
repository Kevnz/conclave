import React, { useContext } from 'react'
import { Form, TextBox, EmailInput, Button } from 'react-form-elements'
import { Control } from '@brightleaf/elements'
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
  console.log({ error, loading, makeQuery, data })
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
            className="form"
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
            <TextBox
              name="firstName"
              label="First Name"
              initialValue=""
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <TextBox
              name="lastName"
              label="Last Name"
              initialValue=""
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <EmailInput
              type="email"
              name="email"
              label="Email"
              initialValue=""
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <TextBox
              name="username"
              label="Username"
              initialValue=""
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <TextBox
              name="password"
              label="Password"
              initialValue=""
              type="password"
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <TextBox
              name="verifyPassword"
              label="Verify Password"
              initialValue=""
              type="password"
              className="field control"
              labelClassName="label"
              inputClassName="input"
            />
            <Control>
              <Button className="button is-primary">Register</Button>
            </Control>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default RegisterForm
