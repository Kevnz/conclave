import React from 'react'
import PropTypes from 'prop-types'

const CreatedBy = ({ username, createdOn }) => {
  return (
    <div>
      <b>{username}</b> on <span>{createdOn}</span>
    </div>
  )
}

CreatedBy.propTypes = {
  username: PropTypes.string,
  createdOn: PropTypes.instanceOf(Date),
}

CreatedBy.defaultProps = {
  username: 'USERNAME',
  createdOn: new Date(),
}

export default CreatedBy
