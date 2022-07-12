import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useMediaQuery,
  Text
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import * as React from 'react'
import { Settings } from 'react-feather'
import { RouteComponentProps, withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'
import { color, ColorProps, space, SpaceProps } from 'styled-system'
import { useAppContext } from '../../context/AppProvider'
import { useAuthContext } from '../../context/AuthProvider/index'
import Breadcrumbs from '../Breadcrumbs'
import SideBarButton from '../SideBar/SideBarButton'

type HeaderProps = RouteComponentProps &
  ColorProps & {
    color?: string
    size?: number
    id?: string
    open?: boolean
    getLoggedInUser?: () => { name?: string; id: string }
  }

type HeaderContProps = SpaceProps &
  ColorProps & {
    color?: string
    open?: boolean
  }

const HeaderCont = styled(motion.div)<HeaderContProps>`
  ${space};
  ${color};
  top: 0;
  right: 0;
  height: 64px;
  z-index: 1290;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  border-bottom-width: 1px;
  justify-content: space-between;
  left: ${(props) => (props.open ? '250px' : '64px')};
  @media screen and (max-width: 40em) {
    left: 0;
  }
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`

const BreadCrumbCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 40em) {
    display: none;
  }
`

const Header: React.FC<HeaderProps> = ({ ...rest }) => {
  const [isTabletOrMobile] = useMediaQuery('(max-width: 40em)')
  const history = useHistory()
  const { drawerOpen, toggleDrawer } = useAppContext()

  const { user, logout } = useAuthContext()

  const handleLogout = () => {
    logout && logout()
    history.push('/')
  }

  return (
    <HeaderCont pr={4} pl={drawerOpen ? 'calc(186px + 1rem)' : '1rem'} {...rest}>
      <BreadCrumbCont>
        <Breadcrumbs />
      </BreadCrumbCont>
      {isTabletOrMobile && <SideBarButton color="black" open={drawerOpen} onClick={toggleDrawer} />}
      <Flex flexDirection="row">
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Text mb={0} mr={4} fontWeight="bold">
            {user?.email}
          </Text>
          <Menu>
            <MenuButton
              size="sm"
              as={IconButton}
              colorScheme="brand"
              icon={<Settings size="18px" />}
            >
              Profile
            </MenuButton>
            <MenuList mr={3} mt={3}>
              <MenuGroup title="Account">
                <MenuItem onClick={() => history.push('profile')}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </HeaderCont>
  )
}

export default withRouter(Header)

Header.defaultProps = {
  bg: 'white'
}
