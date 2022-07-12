import { Flex, FlexProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Variants } from 'framer-motion'
import * as React from 'react'
import { MotionFlex } from '..'
import Version from '../Version'

const PanelWrapper = styled(MotionFlex)`
  top: 0;
  left: 0;
  bottom: 0;
  width: 350px;
  display: flex;
  max-width: 100%;
  position: fixed;
  overflow-y: auto;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    position: relative;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`

const variants: Variants = {
  hidden: {
    x: '-350px'
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 18
    }
  }
}

const SideSlider: React.FC<FlexProps> = ({ children, justify }) => {
  return (
    <PanelWrapper
      p={5}
      m={[5, 0]}
      bg="white"
      initial="hidden"
      animate="visible"
      rounded={['md', 0]}
      variants={variants}
    >
      <Flex flexDir="column" width="100%" minHeight="100%" justify={justify}>
        {children}
        <Version />
      </Flex>
    </PanelWrapper>
  )
}

export default SideSlider

SideSlider.defaultProps = {
  justify: 'center'
}
