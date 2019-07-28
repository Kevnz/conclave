import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from '@brightleaf/elements'
export const AccountLink = ({ name, onClick }) => {
  return (
    <Button
      isSmall
      isAnchor
      isOutlined
      href="#"
      onClick={e => {
        console.log('the click', onClick.toString())
        onClick(e)
      }}
    >
      <Icon fa icon="user" /> <span> {name}</span>
    </Button>
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
