import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, EmailInput, Button } from 'react-form-elements'

export const LoginInput = ({ onSubmit }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <EmailInput
          name="email"
          label="Email"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextBox
          name="password"
          label="Password"
          type="password"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <Button>Login</Button>
      </Form>
    </div>
  )
}

LoginInput.propTypes = {
  onSubmit: PropTypes.func,
}

LoginInput.defaultProps = {
  onSubmit: () => {},
}

export default LoginInput
