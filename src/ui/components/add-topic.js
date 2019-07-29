import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, TextArea, Button } from 'react-form-elements'

export const AddTopic = ({ onSubmit }) => {
  return (
    <div>
      <Form onSubmit={onSubmit} name="add-topic">
        <TextBox
          name="title"
          label="Title"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextArea
          name="description"
          label="Description"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
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
