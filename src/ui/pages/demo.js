/* eslint-disable no-unused-vars */
import React from 'react'
import {
  BaseIcon,
  Box,
  Button,
  Card,
  CardImageContainer,
  CardBody,
  Column,
  Columns,
  Container,
  Content,
  Control,
  Field,
  Footer,
  Hero,
  HeroHead,
  HeroBody,
  HeroFooter,
  Image,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  NavBar,
  NavBarStart,
  NavBarEnd,
  NavBarMenu,
  NavBarBrand,
  NavBarBurger,
  NavBarDropDown,
  NavBarItem,
  NavBarDivider,
  Icon,
  Tile,
  Title,
  SubTitle,
  Tag,
  Tags,
  Tabs,
  TabItem,
  MediaObject,
  MediaContent,
  MediaLeft,
  MediaRight,
} from '@brightleaf/elements'

export default function demo() {
  return (
    <>
      <article className="post">
        <h4>Bulma: How do you center a button in a box?</h4>
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
                <a href="#">@jsmith</a> replied 34 minutes ago &nbsp;
                <Tag as="span">Question</Tag>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <span className="has-text-grey-light">
              <BaseIcon icon="comments" fa /> 1
            </span>
          </MediaRight>
        </MediaObject>
      </article>
      <article className="post">
        <h4>How can I make a bulma button go full width?</h4>
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
                <a href="#">@red</a> replied 40 minutes ago &nbsp;
                <Tag as="span">Question</Tag>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <span className="has-text-grey-light">
              <BaseIcon icon="comments" fa /> 0
            </span>
          </MediaRight>
        </MediaObject>
      </article>
      <article className="post">
        <h4>
          TypeError: Data must be a string or a buffer when trying touse
          vue-bulma-tabs
        </h4>
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
                <a href="#">@jsmith</a> replied 53 minutes ago &nbsp;
                <Tag as="span">Question</Tag>
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
      <article className="post">
        <h4>How to vertically center elements in Bulma?</h4>
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
                <a href="#">@brown</a> replied 3 hours ago &nbsp;
                <Tag as="span">Question</Tag>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <span className="has-text-grey-light">
              <BaseIcon icon="comments" fa /> 2
            </span>
          </MediaRight>
        </MediaObject>
      </article>
      <article className="post">
        <h4>
          I am trying to use hamburger menu on bulma css, but it does not work.
          What is wrong?
        </h4>
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
                <a href="#">@hamburgler</a> replied 5 hours ago &nbsp;
                <Tag as="span">Question</Tag>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <span className="has-text-grey-light">
              <BaseIcon icon="comments" fa /> 2
            </span>
          </MediaRight>
        </MediaObject>
      </article>
      <article className="post">
        <h4>How to make tiles wrap with Bulma CSS?</h4>
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
                <a href="#">@rapper</a> replied 3 hours ago &nbsp;
                <Tag as="span">Question</Tag>
              </p>
            </Content>
          </MediaContent>
          <MediaRight>
            <span className="has-text-grey-light">
              <BaseIcon icon="comments" fa /> 2
            </span>
          </MediaRight>
        </MediaObject>
      </article>
    </>
  )
}
