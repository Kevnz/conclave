import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ title, body, replies, level }) => {
  return (
    <div
      style={{
        paddingLeft: `${level * 15}px`,
      }}
    >
      <h3>{title}</h3>
      <div>{body}</div>
      <div>created by</div>
    </div>
  )
}

Message.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  level: PropTypes.number,
  replies: PropTypes.array,
}

Message.defaultProps = {
  title: 'TITLE',
  body: 'MESSAGE BY',
  level: 1,
  replies: [],
}

export default Message
