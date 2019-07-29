import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { useMutation, useLocalStorage } from '@brightleaf/react-hooks'
import AddPost from '../components/add-post'

const POST_MUTATION = `
  mutation AddPost($postInput: PostInput!) {
    addPost(postInput: $postInput) {
      id
      title
    }
  }
`

export const AddPostFeature = ({ topicId }) => {
  const [token] = useLocalStorage('auth_token')
  console.log('topic id', topicId)
  const { error, loading, makeQuery, data } = useMutation(
    '/graphql',
    POST_MUTATION,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  )

  if (data && data.addTopic) {
    const { id } = data.addPost
    navigate(`/topic/${topicId}#${id}`)
  }

  return (
    <div>
      {error && <div>Error</div>}
      {loading && <div>Loading</div>}
      <h2>Add Post</h2>
      <AddPost
        onSubmit={({ title, body }) => {
          makeQuery({
            postInput: {
              title,
              body,
              topicId: parseInt(topicId, 10),
              parentId: null,
            },
          })
        }}
      />
    </div>
  )
}

AddPostFeature.propTypes = {
  onSubmit: PropTypes.func,
}

AddPostFeature.defaultProps = {}

export default AddPostFeature
