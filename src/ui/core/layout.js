import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import {
  BaseIcon,
  Box,
  Button,
  Column,
  Columns,
  Container,
  Content,
  Control,
  Field,
  Footer,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  NavBar,
  NavBarStart,
  NavBarEnd,
  NavBarMenu,
  NavBarBrand,
  NavBarItem,
  Icon,
  Tag,
  Tags,
} from '@brightleaf/elements'
import { useStyleSheet } from '@brightleaf/react-hooks/lib/use-stylesheet'
import { AccountLink } from '../components/account-link'
import { AuthContext } from './context/auth'
import './forum.css'

export const Layout = ({ children }) => {
  useStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700')
  const { state, dispatch } = useContext(AuthContext)
  return (
    <>
      <NavBar className="navbar is-white topNav">
        <Container className="container">
          <NavBarBrand src="conclave.png" width="112" height="28" />
          <NavBarMenu id="topNav" className="navbar-menu">
            <NavBarStart>
              <NavBarItem>
                <a href="/">Home</a>
              </NavBarItem>
              <NavBarItem>
                <a href="#LANDING">Landing</a>
              </NavBarItem>
              <NavBarItem>
                <a href="#BLOG">Blog</a>
              </NavBarItem>
            </NavBarStart>
            <NavBarEnd>
              <NavBarItem>
                <div>
                  <Field isGrouped>
                    {state.isLoggedIn ? (
                      <>
                        <Control>
                          <AccountLink
                            name={`${state.user.firstName} ${state.user.lastName}`}
                          />
                        </Control>
                        <Control>
                          <Button
                            isSmall
                            isInfo
                            isOutlined
                            onClick={e => {
                              e.preventDefault()
                              dispatch({ type: 'logout' })
                            }}
                          >
                            <Icon icon="sign-out-alt" fas />
                            <span>Logout</span>
                          </Button>
                        </Control>
                      </>
                    ) : (
                      <>
                        <Control>
                          <Button
                            className="button is-small "
                            onClick={e => {
                              e.preventDefault()
                              navigate('/login')
                            }}
                          >
                            <Icon icon="user" fas />
                            <span>Login</span>
                          </Button>
                        </Control>
                        <Control>
                          <Button
                            isSmall
                            isAnchor
                            onClick={e => {
                              e.preventDefault()
                              navigate('/register')
                            }}
                          >
                            <Icon icon="user-plus" fas />
                            <span>Register</span>
                          </Button>
                        </Control>
                      </>
                    )}
                  </Field>
                </div>
              </NavBarItem>
            </NavBarEnd>
          </NavBarMenu>
        </Container>
      </NavBar>
      <NavBar isWhite>
        <Container>
          <NavBarMenu>
            <NavBarStart>
              <NavBarItem isActive>
                <a href="#">Popular</a>
              </NavBarItem>
              <NavBarItem>
                <a href="#">Recent</a>
              </NavBarItem>
              <NavBarItem>
                <a href="#">Rising</a>
              </NavBarItem>
            </NavBarStart>
            <NavBarEnd>
              <NavBarItem>
                <div>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search forum..."
                  />
                </div>
              </NavBarItem>
            </NavBarEnd>
          </NavBarMenu>
        </Container>
      </NavBar>
      <Container>
        <Columns>
          <Column is="3">
            <Button
              isAnchor
              isPrimary
              isLarge
              className="is-block is-alt"
              href="#"
              onClick={e => {
                e.preventDefault()
                navigate('/topic/add')
              }}
            >
              New Post
            </Button>
            <Menu className="menu">
              <MenuLabel>Tags</MenuLabel>
              <MenuList>
                <MenuListItem>
                  <Tag isPrimary isMedium>
                    Dashboard
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag className="is-link" isMedium>
                    Customers
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag isLight isDanger isMedium>
                    Authentication
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag isDark isMedium>
                    Payments
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag isSuccess isMedium>
                    Transfers
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag isWarning isMedium>
                    Balance
                  </Tag>
                </MenuListItem>
                <MenuListItem>
                  <Tag isMedium>Question</Tag>
                </MenuListItem>
              </MenuList>
            </Menu>
          </Column>
          <Column is="9">
            <Box className="content">{children}</Box>
          </Column>
        </Columns>
      </Container>
      <Footer>
        <Container>
          <Content hasTextCentered>
            <Columns isMobile isCentered>
              <Field isGrouped isGroupedMultiline>
                <Control>
                  <Tags hasAddons>
                    <Tag
                      isLink
                      href="https://github.com/dansup/bulma-templates"
                    >
                      Bulma Templates
                    </Tag>
                    <Tag isLight>Daniel Supernault</Tag>
                  </Tags>
                </Control>
                <Control>
                  <Tags hasAddons>
                    <Tag isLink href="https://github.com/brightleaf/elements">
                      Brightleaf/Elements
                    </Tag>
                    <Tag isLight>Kevin Isom</Tag>
                  </Tags>
                </Control>
                <Control className="control">
                  <Tags hasAddons className="tags has-addons">
                    <Tag className="is-link">The source code is licensed</Tag>
                    <Tag isLight>
                      MIT &nbsp;<BaseIcon fab icon="github"></BaseIcon>
                    </Tag>
                  </Tags>
                </Control>
              </Field>
            </Columns>
          </Content>
        </Container>
      </Footer>
    </>
  )
}

export default Layout
