import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, TextArea, Button } from 'react-form-elements'
import withStyles from 'react-jss'
import { formStyles } from '../styles/forms'

export const AddTopicBase = ({ onSubmit, classes }) => {
  return (
    <div className={classes.formBase}>
      <Form onSubmit={onSubmit}>
        <TextBox name="title" label="Title" />
        <TextArea name="description" label="Description" />
        <Button>Save</Button>
      </Form>
    </div>
  )
}

export const AddTopic = withStyles(formStyles)(AddTopicBase)

AddTopic.propTypes = {
  onSubmit: PropTypes.func,
}

AddTopic.defaultProps = {
  onSubmit: () => {},
}

export default AddTopic
