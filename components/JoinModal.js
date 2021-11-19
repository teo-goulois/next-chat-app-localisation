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
// firebase calls
import { joinRoom } from '../src/hook/firebase'

const JoinModal = ({ isOpen, setJoinRoom, room, userId }) => {
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Container
            pt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="2xl">{room.name}</Text>
            <IconButton
              w="fit-content"
              onClick={() => setJoinRoom(false)}
              aria-label="Call Segun"
              size="md"
              icon={<CloseIcon />}
            />
          </Container>
          <ModalBody>
            <Text>{room.description}</Text>
            <Text>lorem</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                joinRoom(room.id, userId)
                setJoinRoom(false)
              }}
              colorScheme="blue"
              mr={3}
            >
              join {room.id}
            </Button>
            <Button onClick={() => setJoinRoom(false)} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default JoinModal
