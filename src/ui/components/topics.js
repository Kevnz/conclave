import React, { PropTypes } from 'react'

const TopicListing = ({ title, childTopics, level }) => {
  const subTopics = childTopics.map(topic => (
    <TopicListing {...topic} level={level + 1} />
  ))
  return (
    <div
      style={{
        paddingLeft: `${level * 15}px`,
      }}
    >
      <h3>{title}</h3>
      {subTopics}
    </div>
  )
}

TopicListing.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.number,
  childTopics: React.PropTypes.array,
}

TopicListing.defaultProps = {
  title: 'TITLE',
  description: 'DESCRIPTION',
  level: 1,
  childTopics: [],
}

export default TopicListing
