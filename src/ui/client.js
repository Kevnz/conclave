import React from 'react'
import ReactDOM from 'react-dom'
import MainApp from './index'

console.log('window state', window.__APP_STATE__)
const state = window.__APP_STATE__

ReactDOM.render(
  <MainApp topics={state.topics} />,
  document.getElementById('app')
)
