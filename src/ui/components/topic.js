import React from 'react'
import PropTypes from 'prop-types'

const TopicListing = ({ title, description, childTopics, level }) => {
  const subTopics = childTopics.map(topic => (
    <TopicListing
      key={`topic-${level}-topic-id-${topic.id}`}
      {...topic}
      level={level + 1}
    />
  ))
  return (
    <div
      style={{
        paddingLeft: `${level * 15}px`,
      }}
    >
      <h3>{title}</h3>
      <div>{description}</div>
      {subTopics}
    </div>
  )
}

TopicListing.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.number,
  childTopics: PropTypes.array,
}

TopicListing.defaultProps = {
  title: 'TITLE',
  description: 'DESCRIPTION',
  level: 1,
  childTopics: [],
}

export default TopicListing
