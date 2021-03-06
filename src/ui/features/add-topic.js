import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useLocalStorage } from '@brightleaf/react-hooks'
import { navigate } from '@reach/router'
import AddTopic from '../components/add-topic'
import { GridLoader } from '../components/loader'

const TOPIC_MUTATION = `
  mutation AddTopic($topicInput: TopicInput!) {
    addTopic(topicInput: $topicInput) {
      id
      title
      description
    }
  }
`

export const AddTopicFeature = ({ onSubmit }) => {
  const [token] = useLocalStorage('auth_token')

  const { error, loading, makeQuery, data } = useMutation(
    '/graphql',
    TOPIC_MUTATION,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  )

  const topicContext = useContext('TopicContext')
  console.log('topic context', topicContext)
  const dispatch = obj => {
    console.info(obj)
  }
  if (data && data.addTopic) {
    const { id } = data.addTopic

    dispatch({
      type: 'TOPIC_ADDED',
      payload: { topicId: id },
    })
    navigate(`/topic/${id}`)
  }

  return (
    <div>
      {error && <div>Error</div>}
      {loading && <GridLoader isSmall></GridLoader>}
      <h2>Create a topic</h2>
      <AddTopic
        onSubmit={({ title, description }) => {
          console.log('make it yo')
          makeQuery({
            topicInput: {
              title,
              description,
              parentId: null,
            },
          })
        }}
      />
    </div>
  )
}

AddTopicFeature.propTypes = {
  onSubmit: PropTypes.func,
}

AddTopicFeature.defaultProps = {
  onSubmit: () => {},
}

export default AddTopicFeature
