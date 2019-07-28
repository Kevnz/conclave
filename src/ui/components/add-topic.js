import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, TextArea, Button } from 'react-form-elements'

export const AddTopic = ({ onSubmit }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextBox name="title" label="Title" />
        <TextArea name="description" label="Description" />
        <Button>Save</Button>
      </Form>
    </div>
  )
}

AddTopic.propTypes = {
  onSubmit: PropTypes.func,
}

AddTopic.defaultProps = {
  onSubmit: () => {},
}

export default AddTopic
