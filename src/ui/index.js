import React, { PropTypes } from 'react'
import TopicListing from './components/topics'

const MainApp = ({ topics }) => {
  const listings = topics.map((topic, index) => <TopicListing {...topic} />)
  return <div>{listings}</div>
}

MainApp.propTypes = {
  topics: React.PropTypes.array,
}

MainApp.defaultProps = {
  topics: [],
}

export default MainApp
