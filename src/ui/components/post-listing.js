import React from 'react'
import {
  BaseIcon,
  Content,
  Image,
  MediaContent,
  MediaLeft,
  MediaObject,
  MediaRight,
  Tag,
} from '@brightleaf/elements'
import { timeAgo } from '../utils/time-ago'
/*
  title: String
  body: String
  createdBy: User

  //topic
    id: Int
  title: String
  description: String
  createdBy: User
  parent: Topic
  childTopics: [Topic]
  messages: [Message]
  */
export default function PostListing({
  title,
  body,
  createdBy,
  tag,
  createdOn,
  ...props
}) {
  console.info({
    title,
    body,
    createdBy,
    tag,
    createdOn,
    ...props,
  })
  return (
    <article className="post">
      <h4>{title}</h4>
      <MediaObject as="div">
        <MediaLeft as="div">
          <Image
            as="p"
            is32
            src="http://bulma.io/images/placeholders/128x128.png"
          />
        </MediaLeft>
        <MediaContent>
          <Content>
            <p>
              <a href="#">{createdBy.username}</a> replied {timeAgo(createdOn)}{' '}
              &nbsp;
              <Tag as="span">{tag || 'Post'}</Tag>
            </p>
          </Content>
        </MediaContent>
        <MediaRight>
          <span className="has-text-grey-light">
            <BaseIcon icon="comments" fa /> 13
          </span>
        </MediaRight>
      </MediaObject>
    </article>
  )
}
