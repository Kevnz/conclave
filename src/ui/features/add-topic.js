import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import AddTopic from '../components/add-topic'

const TOPIC_MUTATION = gql`
  mutation AddTopic($newTopicInput: NewTopicInput!) {
    addTopic(newTopicInput: $newTopicInput) {
      title
      description
    }
  }
`

export const AddTopicFeature = ({ onSubmit, classes }) => {
  const addTopic = useMutation(TOPIC_MUTATION)
  const { dispatch } = useContext('TopicContext')

  return (
    <div>
      <h2>Create a topic</h2>
      <AddTopic
        onSubmit={({ title, description }) => {
          addTopic({
            update: (proxy, mutationResult) => {
              console.info('prox', proxy)
              console.info('mutie', mutationResult)
              const { id } = mutationResult.data.addTopic

              dispatch({
                type: 'TOPIC_ADDED',
                payload: { topicId: id },
              })
              // ?navigate('/')
            },
            variables: {
              newTopicInput: {
                title,
                description,
              },
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

export default AddTopic
