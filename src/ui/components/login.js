import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, EmailInput, Button } from 'react-form-elements'
import withStyles from 'react-jss'
import { formStyles } from '../styles/forms'

export const LoginInputBase = ({ onSubmit, classes }) => {
  return (
    <div className={classes.formBase}>
      <Form onSubmit={onSubmit}>
        <EmailInput name="email" label="Email" />
        <TextBox name="password" label="Password" type="password" />
        <Button>Login</Button>
      </Form>
    </div>
  )
}

export const LoginInput = withStyles(formStyles)(LoginInputBase)

LoginInput.propTypes = {
  onSubmit: PropTypes.func,
}

LoginInput.defaultProps = {
  onSubmit: () => {},
}

export default LoginInput
