import React from 'react'
// ui
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
  Text,
  Select,
  Textarea
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const CreateRoomModal = ({ isOpen, onClose, setNewRoomData, handleClick, newRoomData, errors }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>name of the room</FormLabel>
              <Input
                onChange={e =>
                  setNewRoomData({ ...newRoomData, name: e.target.value })
                }
                required
                type="text"
                isInvalid={errors?.name === "filed name"}
              />
              <FormHelperText>description.</FormHelperText>
              <Textarea  isInvalid={errors?.description === "filed description"} required onChange={e =>
                  setNewRoomData({ ...newRoomData, description: e.target.value })
                }></Textarea>
            </FormControl>

            <Select
              onChange={e =>
                setNewRoomData({ ...newRoomData, radius: e.target.value })
              }
              mt={2}
              w="fit-content"
              placeholder="radius"
            >
              <option value="500">500 m</option>
              <option value="1000">1 km</option>
              <option value="5000">5 km</option>
              <option value="10000">10 km</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleClick} variant="ghost">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateRoomModal
