import React from 'react'
import gql from 'graphql-tag'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-apollo-hooks'
import Topic from '../components/topic'

const GET_TOPICS = gql`
  {
    topTopics {
      id
      title
      description
      childTopics {
        id
        title
      }
    }
  }
`
export default () => {
  const { data, error, loading } = useQuery(GET_TOPICS)
  if (loading) {
    return 'loading'
  }
  if (error) {
    console.error(error)
    return 'bugger'
  }
  const topics = data.topTopics.map(t => <Topic key={`topic-${t.id}`} {...t} />)
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>The Conclave - Home</title>
      </Helmet>
      <h1>Topics</h1>
      {topics}
    </main>
  )
}
