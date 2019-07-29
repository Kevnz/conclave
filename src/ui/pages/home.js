/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useQuery, useTitle } from '@brightleaf/react-hooks'
import { Container, Section } from '@brightleaf/elements'
import PostListing from '../components/post-listing'
import { Loader } from '../components/loader'
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
  const { data, error, loading, makeQuery } = useQuery(
    '/graphql',
    GET_RECENT_MESSAGES
  )
  useEffect(() => {
    makeQuery()
  }, [])

  if (loading) {
    return <Loader />
  }
  if (!data.recentPosts) {
    return <Loader />
  }
  if (error) {
    console.error(error)
    return 'bugger'
  }
  const topics = data.recentPosts.map(t => (
    <PostListing key={`topic-${t.id}`} {...t} />
  ))
  return <>{topics}</>
}
