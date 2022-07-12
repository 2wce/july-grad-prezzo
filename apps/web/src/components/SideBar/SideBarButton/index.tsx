import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import React from 'react'
import MotionFlex from '../../MotionFlex'

type SideBarButtonProps = {
  open: boolean
  color: string
  onClick?: () => void
}

const width = 32
const height = 32

const SvgWrap = styled(MotionFlex)`
  width: 64px;
  &:hover {
    cursor: pointer;
  }
`

const MotionSvg = styled(motion.svg)`
  &:hover {
    cursor: pointer;
  }
`

const SideBarButton: React.FC<SideBarButtonProps> = ({
  open = false,
  onClick,
  color,
  ...props
}) => {
  const variant = open ? 'opened' : 'closed'

  const top = {
    closed: {
      rotate: 0,
      translateY: 1
    },
    opened: {
      rotate: 45,
      translateY: 2
    }
  }
  const center = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: -1
    },
    opened: {
      rotate: -45,
      translateY: -2
    }
  }

  const lineProps: any = {
    stroke: color,
    strokeWidth: 2,
    animate: variant,
    initial: 'closed',
    vectorEffect: 'non-scaling-stroke',
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }

  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <SvgWrap>
      <MotionSvg
        width={24}
        height={24}
        onClick={onClick}
        overflow="visible"
        preserveAspectRatio="none"
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        {...props}
      >
        <motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
        <motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
        <motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
      </MotionSvg>
    </SvgWrap>
  )
}

export default SideBarButton
