import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

import Topic from '../src/ui/components/topic'
const data = require('./data-main.json').data
storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Topics', module)
  .add('with no data', () => {
    return <Topic />
  })
  .add('topic with no child topics', () => {
    const topic = data.topics[0]
    return <Topic level={0} {...topic} />
  })
  .add('topic with child topics', () => {
    const topic = data.topics[1]
    return <Topic level={0} {...topic} />
  })
