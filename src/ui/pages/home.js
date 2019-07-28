import React from 'react'
import { useGraphQL, useTitle } from '@brightleaf/react-hooks'
import PostListing from '../components/post-listing'

const GET_TOPICS = `
  {
    topTopics {
      id
      title
      description
      createdOn
      childTopics {
        id
        title
        createdOn
      }
    }
  }
`
/*
id: Int
title: String
body: String
createdBy: User
parent: Topic
createdOn: DateTime
replies: [Message]
*/
const GET_RECENT_MESSAGES = `
  {
    recentPosts {
      id
      title
      body
      createdOn,
      createdBy {
        username
      }
      topic {
        id
        title
        description
        createdBy {
          username
        }
      }
    }
  }
`
export default () => {
  useTitle('The Conclave - Home')
  const { data, error, loading } = useGraphQL('/graphql', GET_RECENT_MESSAGES)
  if (loading) {
    return 'loading'
  }
  if (error) {
    console.error(error)
    return 'bugger'
  }
  const topics = data.recentPosts.map(t => (
    <PostListing key={`topic-${t.id}`} {...t} />
  ))
  return (
    <main>
      <h1>Topics</h1>
      {topics}
    </main>
  )
}
