import { Avatar, Flex, FlexProps, useMediaQuery, Text } from '@chakra-ui/react'
import { AnimatePresence, motion, useAnimation, Variants } from 'framer-motion'
import * as React from 'react'
import { get } from 'styled-system'
import { useAppContext } from '../../context/AppProvider'
import { useAuthContext } from '../../context/AuthProvider/index'
import { NavItem } from '../../navigation'
import { images, theme } from '../../theme'
import Header from '../Header'
import MotionFlex from '../MotionFlex'
import SideBarButton from './SideBarButton'
import SideBarItem from './SideBarItem'
import { MenuCont, Overlay, RenderWrapper } from './styles'

type SideBarProps = FlexProps & {
  accentColor: string
  borderColor?: string
  closeOnNavigate?: boolean
  color: string
  hoverColor: string
  navItems: NavItem[]
  tooltipBg?: string
  tooltipColor?: string
}

const SideBar: React.FC<SideBarProps> = ({
  accentColor,
  bg,
  borderColor,
  children,
  color,
  hoverColor,
  navItems,
  tooltipBg,
  tooltipColor,
  closeOnNavigate
}) => {
  const { drawerOpen, toggleDrawer } = useAppContext()

  const { user } = useAuthContext()

  const controls = useAnimation()

  const [isTabletOrMobile] = useMediaQuery('(max-width: 40em)')

  React.useEffect(() => {
    if (drawerOpen) {
      controls.start('open')
    } else {
      controls.start('closed')
    }
  }, [isTabletOrMobile, drawerOpen, controls])

  const variants: Variants = {
    open: {
      x: 0,
      width: 250,
      transition: { staggerChildren: 0.05, delayChildren: 0.05, stiffness: 10, damping: 5 }
    },
    closed: {
      x: isTabletOrMobile ? -250 : 0,
      width: isTabletOrMobile ? 250 : 64,
      transition: {
        stiffness: 80,
        staggerDirection: -1,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      <MenuCont
        bg={bg}
        flexDir="column"
        animate={controls}
        variants={variants}
        alignItems="flex-start"
        // Calculate offset based on icon size
        iconOffset={(64 - 20) / 2}
        justifyContent="flex-start"
        initial={{ width: drawerOpen ? 250 : 64 }}
      >
        <Flex
          pl="20px"
          width="100%"
          height="64px"
          alignItems="center"
          borderBottomWidth={1}
          justifyContent="flex-start"
          borderColor={borderColor}
        >
          <SideBarButton color={color} open={drawerOpen} onClick={toggleDrawer} />
          <Flex pr={2} flex={1} justifyContent="flex-end">
            <AnimatePresence>
              {drawerOpen && (
                <motion.img
                  width="60%"
                  height="auto"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images.sovtechLogo}
                  style={{ alignSelf: 'flex-start' }}
                />
              )}
            </AnimatePresence>
          </Flex>
        </Flex>
        {user && (
          <MotionFlex
            py={4}
            pr={4}
            width="100%"
            align="center"
            pl={(64 - 30) / 2}
            justify="flex-start"
            borderBottomWidth={1}
            borderBottomColor={borderColor}
            style={{ whiteSpace: 'nowrap' }}
            whileHover={{
              backgroundColor: get(theme, `colors.${hoverColor}`, 'pink'),
              cursor: 'pointer'
            }}
          >
            <Avatar
              mr={4}
              width="30px"
              height="30px"
              fontSize="12px"
              name={`${user?.name}` || ''}
              src={''}
            />
            <AnimatePresence>
              {drawerOpen && (
                <Text
                  color={color}
                  fontWeight="bold"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                >
                  {`${user?.name}` || ''}
                </Text>
              )}
            </AnimatePresence>
          </MotionFlex>
        )}
        {navItems.map((props) => (
          <SideBarItem
            color={color}
            key={props.title}
            hoverColor={hoverColor}
            accentColor={accentColor}
            tooltipColor={tooltipColor}
            tooltipBg={tooltipBg}
            closeOnNavigate={closeOnNavigate}
            {...props}
          />
        ))}
      </MenuCont>
      <RenderWrapper
        className="render-wrapper"
        pl={isTabletOrMobile ? 0 : drawerOpen ? '250px' : '64px'}
      >
        <Header />
        {children}
        {isTabletOrMobile && (
          <Overlay
            onClick={toggleDrawer}
            initial={{ opacity: 0 }}
            pointerEvents={drawerOpen ? 'auto' : 'none'}
            animate={drawerOpen ? { opacity: 1 } : { opacity: 0 }}
          />
        )}
      </RenderWrapper>
    </>
  )
}

export default SideBar

SideBar.defaultProps = {
  color: 'white',
  bg: 'gray.900',
  hoverColor: 'gray.800',
  borderColor: 'gray.700',
  accentColor: 'cyan.500'
}
