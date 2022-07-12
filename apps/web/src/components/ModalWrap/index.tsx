import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Heading
} from '@chakra-ui/react'
import * as React from 'react'
import { X } from 'react-feather'
import Card from '../Card'
import CardHeader from '../Card/CardHeader'

type ModalWrapProps = ModalProps & {
  title: string
}

const ModalWrap: React.FC<ModalWrapProps> = ({ children, title, onClose, isOpen, ...rest }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent shadow="none" bg="transparent" rounded="md">
        <Card
          rounded="md"
          shadow="md"
          m={4}
          overflow="auto"
          borderWidth={0}
          justifyContent="flex-start"
        >
          <CardHeader alignItems="center" flexDirection="row" justifyContent="space-between">
            <Heading as="h5" mb={0}>
              {title}
            </Heading>
            <IconButton onClick={onClose} size="sm" aria-label="Close Modal" icon={<X />} />
          </CardHeader>
          {children}
        </Card>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrap

ModalWrap.defaultProps = {
  title: 'Modal Heading',
  size: 'xl',
  scrollBehavior: 'inside',
  isCentered: true,
  preserveScrollBarGap: true
}
