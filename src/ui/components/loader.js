import React from 'react'
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

export const GridLoader = () => {
  return (
    <div className="prepreloader">
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
