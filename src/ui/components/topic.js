import React from 'react'
import PropTypes from 'prop-types'
import { timeAgo } from '../utils/time-ago'
const TopicListing = ({
  title,
  description,
  childTopics,
  level,
  createdOn,
}) => {
  console.log('createdOn', createdOn)
  const ago = timeAgo(createdOn)
  console.log('ago', ago)
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
      <div>{ago}</div> {subTopics}
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
