import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, TextArea, Button } from 'react-form-elements'

export const AddPost = ({ onSubmit }) => {
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
          name="body"
          label="Message"
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <Button>Save</Button>
      </Form>
    </div>
  )
}

AddPost.propTypes = {
  onSubmit: PropTypes.func,
}

AddPost.defaultProps = {
  onSubmit: () => {},
}

export default AddPost
