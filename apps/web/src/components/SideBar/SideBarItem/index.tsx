import { Flex, useMediaQuery, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'
import { MenuItem, Tooltip } from './styles'

type SideBarItemProps = {
  title: string
  to: string
  color: string
  hoverColor: string
  accentColor: string
  icon: React.ReactNode
  tooltipColor?: string
  tooltipBg?: string
  closeOnNavigate?: boolean
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  accentColor,
  color,
  hoverColor,
  icon,
  title,
  to,
  tooltipColor,
  tooltipBg,
  closeOnNavigate
}) => {
  const { drawerOpen, toggleDrawer } = useAppContext()

  const [isTabletOrMobile] = useMediaQuery('(max-width: 40em)')

  const variants = {
    open: {
      x: 0,
      transition: {
        x: { stiffness: 200, velocity: -100 }
      }
    },
    closed: {
      x: isTabletOrMobile ? -50 : 0,
      transition: {
        x: { stiffness: 200 }
      }
    }
  }

  return (
    <MenuItem
      to={to}
      color={color}
      bg={accentColor}
      variants={variants}
      hovercolor={hoverColor}
      onClick={() => {
        if (closeOnNavigate && drawerOpen) {
          toggleDrawer()
        }
      }}
      accentcolor={accentColor}
      activeClassName="active-nav-link"
    >
      <Flex
        height="50px"
        alignItems="center"
        justifyContent="center"
        className="sidebar-nav-item-wrapper"
      >
        <Flex className="icon-wrap">{icon}</Flex>
        <AnimatePresence>
          {drawerOpen && (
            <Text
              ml={4}
              color={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, pointerEvents: 'none' }}
            >
              {title}
            </Text>
          )}
        </AnimatePresence>
        {!drawerOpen && !isTabletOrMobile && (
          <Tooltip bg={tooltipBg || 'gray.800'} className="sidebar-tooltip">
            <Text fontSize={13} color={tooltipColor || 'white'}>
              {title}
            </Text>
          </Tooltip>
        )}
      </Flex>
    </MenuItem>
  )
}

export default SideBarItem
