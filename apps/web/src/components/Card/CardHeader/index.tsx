import { Flex, FlexProps } from '@chakra-ui/react'
import * as React from 'react'

type CardHeaderProps = FlexProps

const CardHeader: React.FC<CardHeaderProps> = ({ children, ...rest }) => {
  return (
    <Flex borderBottomWidth="1px" {...rest}>
      {children}
    </Flex>
  )
}

export default CardHeader

CardHeader.defaultProps = {
  p: 4,
  roundedTopLeft: 4,
  roundedTopRight: 4,
  flexDir: 'row'
}
