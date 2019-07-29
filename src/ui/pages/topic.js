import React from 'react'

import { useGraphQL } from '@brightleaf/react-hooks/lib/use-graphql'
import Topic from '../components/topic'
import PostListing from '../components/post-listing'

export default ({ topicId }) => {
  const GET_TOPICS = `
{
  topics(topicId: ${parseInt(topicId, 10)}) {
    id
    title
    description
    messages {
      id,
      title,
      body,
      createdBy {
        username
      }
      createdOn
    }
  }
}
`
  const { data, error, loading } = useGraphQL('/graphql', GET_TOPICS)

  if (loading) {
    return 'loading'
  }
  if (error) {
    console.error(error)
    return 'bugger'
  }
  if (data && !data.topics) {
    return <div>wait for it</div>
  }
  console.info('data', data.topics[0])
  const posts =
    data && data.topics ? (
      data.topics[0].messages.map(t => {
        console.info('the message', t)
        // return <div>{t.title}</div>
        return <PostListing key={`topic-${t.id}`} {...t} />
      })
    ) : (
      <div>wait for it</div>
    )
  return (
    <main>
      <h1>Topic</h1>
      {posts}
    </main>
  )
}
