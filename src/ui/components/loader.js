import React from 'react'
import classnames from 'classnames'
import './loader.scss'

export const Loader = () => {
  return (
    <div className="prepreloader">
      <div className="preloader">
        <div className="loader"></div>
      </div>
    </div>
  )
}

export const GridLoader = ({ isSmall }) => {
  return (
    <div className={classnames('prepreloader', { small: isSmall })}>
      <div className="preloader">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
