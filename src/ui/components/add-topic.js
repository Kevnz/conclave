import React from 'react'
import PropTypes from 'prop-types'
import { Form, TextBox, TextArea } from 'react-form-elements'
import { Button } from '@brightleaf/elements'

export const AddTopic = ({ onSubmit }) => {
  return (
    <div>
      <Form onSubmit={onSubmit} name="add-topic" className="form">
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
        <Button isInfo className="is-alt">
          Save
        </Button>
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
