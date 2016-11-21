import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import TopicListing from '../src/ui/components/topics';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));
storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))
  .add('with some emoji and text', () => (
    <Button onClick={action('clicked')}>Hi 😀 😎 👍 💯</Button>
  ));
storiesOf('TopicListing', module)
  .add('to Storybook', () => (
    <TopicListing title='TopicListing' />
  ))
  .add('TopicListing with child', () => (
    <TopicListing title='TopicListing 2' childTopics={[{ title: 'child 1' }]} />
  ))
  .add('TopicListing with multiple children', () => (
    <TopicListing title='TopicListing 3' childTopics={[{ title: 'child 1' },{ title: 'child 2' },{ title: 'child 3' }]} />
  ))
  .add('TopicListing with nested children', () => (
    <TopicListing title='TopicListing 4' childTopics={[{ title: 'child 1',childTopics: [{ title: 'Nested child 1' },{ title: 'Nested child 2' }] },{ title: 'child 2' },{ title: 'child 3' }]} />
  ));

