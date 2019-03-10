import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import './style.css'
import { AccountLink } from '../src/ui/components/account-link'

storiesOf('AccountLink', module)
  .add('with name prop', () => (
    <AccountLink onClick={action('clicked')} name="The Dude" />
  ))
  .add('with some emoji', () => (
    <AccountLink onClick={action('clicked')} name="😀 😎 👍 💯" />
  ))
