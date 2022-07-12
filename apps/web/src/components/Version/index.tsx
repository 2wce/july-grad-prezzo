import { Flex, FlexProps, Text } from '@chakra-ui/react'
import * as React from 'react'
import * as packageJson from '../../../package.json'

const Version: React.FC<FlexProps> = (props) => {
  return (
    <Flex {...props}>
      <Text>v{packageJson.version}</Text>
    </Flex>
  )
}

export default Version

Version.defaultProps = {
  width: '100%',
  p: 3,
  justify: 'center',
  align: 'center'
}
