import React, { useEffect, useState } from 'react'
import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
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
  Input
} from '@chakra-ui/react'
import jsonRooms from '../rooms.json'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/initFirebase'

const Rooms = ({
  coords,
  selectedRadius,
  setSelectedRadius,
  setCenteredPosition,
  roomsData
}) => {
  console.log('romms data', roomsData)
  roomsData?.forEach((doc) => console.log(doc.data()))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rooms, setRooms] = useState(jsonRooms)
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    radius: '',
    center: null
  })
  useEffect(() => {
    let nroom = jsonRooms.sort((a, b) => a.radius - b.radius)
    setRooms(nroom)
  }, [])

  useEffect(() => {
    console.log(newRoomData)
  }, [newRoomData])

  useEffect(() => {
    if (selectedRadius === 'croissant') {
      let nroom = jsonRooms.sort((a, b) => a.radius - b.radius)
      setRooms(nroom)
    } else {
      let nroom = jsonRooms.filter(r => r.radius === selectedRadius)
      setRooms(nroom)
    }
  }, [selectedRadius])

  const handleChange = e => {
    setSelectedRadius(e.target.value)
  }
  const handleClick = () => {
    setNewRoomData({ ...newRoomData, center: coords })
    const sendtoFirestore = async () => {
      try {
        const docRef = await addDoc(collection(db, 'rooms'), {
          name: newRoomData.name,
          center: newRoomData.center,
          radius: newRoomData.radius
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
    sendtoFirestore()
  }

  useEffect(() => {
    console.log(roomsData)
  }, [])

  return (
    <Box p={5}>
      <Box>
        <Heading as="h4">Rooms</Heading>
        <Button onClick={onOpen} w="full" mb={2}>
          new room
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="email">
                <FormLabel>new Room</FormLabel>
                <Input
                  onChange={e =>
                    setNewRoomData({ ...newRoomData, name: e.target.value })
                  }
                  type="text"
                />
                <FormHelperText>name of the room.</FormHelperText>
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
        <Box>
          <Select
            defaultValue="croissant"
            onChange={handleChange}
            placeholder="select radius"
          >
            <option value="croissant">croissant</option>
            <option value="500">500 m</option>
            <option value="1000">1 km</option>
            <option value="5000">5 km</option>
          </Select>
        </Box>
      </Box>
      <Divider />

      {roomsData?.length > 0 ? (
        roomsData.map(r => {
          if (
            r.data().center.lat > coords.lat - 0.45 &&
            r.data().center.lat < coords.lat + 0.45 &&
            r.data().center.lng > coords.lng - 0.45 &&
            r.data().center.lng < coords.lng + 0.45
          ) {
            return (
              <Button
                mt={2}
                p={2}
                border="1px"
                borderColor="gray.500"
                borderRadius={5}
                w="full"
                onClick={() => {
                  setCenteredPosition({ lat: 0, lng: 0 })
                  setCenteredPosition(r.data().center)
                }}
              >
                <VStack p={2}>
                  <Text>{r.data().name}</Text>
                  <Text fontSize="xs" color="gray.400" as="i" align="center">
                    {r.data().radius} m
                  </Text>
                </VStack>
              </Button>
            )
          }
        })
      ) : (
        <p>no room coresponding</p>
      )}
    </Box>
  )
}

export default Rooms
