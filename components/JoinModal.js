import React from 'react'
import { Button } from '@chakra-ui/button'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  IconButton,
  HStack,
  Container,
  Text
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const JoinModal = ({ isOpen, setJoinRoom, name }) => {
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Container pt={4} display="flex" justifyContent="space-between" alignItems="center" >
            <Text fontSize="2xl" >{name}</Text>
            <IconButton
              w="fit-content"
              onClick={() => setJoinRoom(false)}
              aria-label="Call Segun"
              size="md"
              icon={<CloseIcon />}
            />
          </Container>
          <ModalBody>
            <Text>description</Text>
            <Text>lorem</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              join
            </Button>
            <Button onClick={() => setJoinRoom(false)} variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default JoinModal
