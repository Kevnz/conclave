import React from 'react'
import { Form, TextBox } from 'react-form-elements'
const ContactForm = () => {
  return (
    <main>
      <section>
        <h2>Contact</h2>
        <div>
          <Form
            onSubmit={values => {
              console.log('Name', values.userName)
              console.log('Email', values.userEmail)
              console.log('Message', values.message)
            }}
          >
            <TextBox name="firstName" label="First Name" initialValue="" />
            <TextBox name="lastName" label="First Name" initialValue="" />
            <TextBox
              type="email"
              name="userEmail"
              label="Your Email"
              initialValue=""
            />
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
            <button>Register</button>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default ContactForm
