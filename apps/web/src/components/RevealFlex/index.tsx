import { FlexProps } from '@chakra-ui/react'
import { MotionProps, useAnimation } from 'framer-motion'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import MotionFlex from '../MotionFlex'

const container = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const RevealFlex: React.FC<FlexProps & MotionProps> = ({ children, ...rest }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.5 })

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const childrenWithProps = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { variants: item })
  )

  return (
    <MotionFlex ref={ref} initial="hidden" animate={controls} variants={container} {...rest}>
      {childrenWithProps}
    </MotionFlex>
  )
}

export default RevealFlex

RevealFlex.defaultProps = {
  flexDirection: 'column',
  align: 'center',
  justify: 'center'
}
