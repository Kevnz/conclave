import React, { useContext } from 'react'
import { Form, TextBox, EmailInput, Button } from 'react-form-elements'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { navigate } from '@reach/router'
import { AuthContext } from '../core/context/auth'

const REGISTER_MUTATION = gql`
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
  const registerUser = useMutation(REGISTER_MUTATION)
  const { state, dispatch } = useContext(AuthContext)

  if (state.isLoggedIn) {
    return <div>Account already exists</div>
  }
  return (
    <main>
      <section>
        <h2>Create your account</h2>
        <div>
          <Form
            name="registerForm"
            onSubmit={({
              firstName, lastName, email, password, username
            }) => {
              registerUser({
                update: (proxy, mutationResult) => {
                  console.info('prox', proxy)
                  console.info('mutie', mutationResult)
                  const { token, user } = mutationResult.data.signup

                  dispatch({
                    type: 'login',
                    payload: { token, user },
                  })
                  navigate('/')
                },
                variables: { newUserInput: {
                  firstName, lastName, email, password, username
                } },
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
