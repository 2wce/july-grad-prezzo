import { Button, Flex, Image, Text, Heading } from '@chakra-ui/react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PageWrap } from '../../layouts'
import { images } from '../../theme'

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <PageWrap title="404" justify="center" align="center" height="100vh" width="100vw">
      <Flex justify="center" align="center" p={4} flexDir="column">
        <Image mb={6} src={images[404]} width="350px" maxWidth="100%" height="auto" />
        <Heading as="h4">Sorry, we couldn&apos;t find what you were looking for.</Heading>
        <Button onClick={() => history.push('/')} mt={6} colorScheme="brand">
          <Text fontWeight="lighter">Back Home</Text>
        </Button>
      </Flex>
    </PageWrap>
  )
}

export default PageNotFound
