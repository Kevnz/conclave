import React from 'react'
import PropTypes from 'prop-types'

export const AccountLink = ({ name, onClick }) => {
  return (
    <div>
      <a
        href="#"
        onClick={e => {
          console.log('the click', onClick.toString())
          onClick(e)
        }}
      >
        {' '}
        {name}{' '}
      </a>
    </div>
  )
}

AccountLink.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
}

AccountLink.defaultProps = {
  onClick: e => {
    console.log('default')
    e.preventDefault()
  },
}

export default AccountLink
