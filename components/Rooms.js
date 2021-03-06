import React, { useEffect, useState } from 'react'
// ui
import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Button } from '@chakra-ui/button'
import { useDisclosure, IconButton } from '@chakra-ui/react'
import { CloseIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

// animation
import { motion } from 'framer-motion'
// auth
import useAuth from '../src/hook/auth'
// Components
import CreateRoomModal from './CreateRoomModal'
import JoinModal from './JoinModal'
// firebase calls
import { postRoom } from '../src/hook/firebase'

const variants = {
  open: { opacity: 1, y: 0, display: 'block' },
  closed: { opacity: 0, y: '-100%', display: 'none' }
}

const Rooms = ({
  coords,
  selectedRadius,
  setSelectedRadius,
  setCenteredPosition,
  roomsData,
  setSelectedRoom,
  setBtnOpen
}) => {
  const auth = useAuth()
  const { user } = auth
  // states
  const [btnOpen, setbtnOpen] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [joinRoom, setJoinRoom] = useState(false)
  const [rooms, setRooms] = useState(roomsData)
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    radius: '',
    description: '',
    center: null
  })
  const [errors, setErrors] = useState({
    name: '',
    radius: '',
    description: ''
  })

  // set the rooms to show to croissant at the start
  useEffect(() => {
    let nroom = roomsData.sort((a, b) => Number(a.radius) - Number(b.radius))
    setRooms(nroom)
  }, [])

  /*   useEffect(() => {
    console.log(selectedRadius)
  }, [selectedRadius]) */

  // change the rooms disposition on radius change
  useEffect(() => {
    if (selectedRadius === 'croissant') {
      let nroom = roomsData.sort((a, b) => Number(a.radius) - Number(b.radius))
      setRooms(nroom)
    } else {
      let nroom = roomsData.filter(
        r => Number(selectedRadius) >= Number(r.radius)
      )
      setRooms(nroom)
    }
  }, [selectedRadius])

  // handle radius change
  const handleChange = e => {
    setSelectedRadius(e.target.value)
  }

  const handleClick = () => {
    setErrors(null)
    if (newRoomData.name === '') {
      setErrors({ ...errors, name: 'filed name' })
    } else if (newRoomData.description === '') {
      setErrors({ ...errors, description: 'filed description' })
    } else if (newRoomData.radius === '') {
      setErrors({ ...errors, radius: 'chose radius' })
    } else {
      postRoom(newRoomData, coords, user, onClose)
    }
  }

  const handleDrag = e => {
    console.log(e)
  }

  return (
    <>
      <Box display={{ base: 'none', md: 'block' }} p={5}>
        <Box>
          <Heading as="h4">Rooms</Heading>
          <Button onClick={onOpen} w="full" mb={2}>
            new room
          </Button>
          <CreateRoomModal
            newRoomData={newRoomData}
            isOpen={isOpen}
            onClose={onClose}
            setNewRoomData={setNewRoomData}
            handleClick={handleClick}
            errors={errors}
          />
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

        {rooms?.length > 0 ? (
          rooms.map((r, index) => {
            if (r.users.includes(user.uid)) return
            if (
              /*  r.center.lat > coords.lat - 0.45 &&
            r.center.lat < coords.lat + 0.45 &&
            r.center.lng > coords.lng - 0.45 &&
            r.center.lng < coords.lng + 0.45 */
              true
            ) {
              return (
                <div key={r.id}>
                  <Button
                    zIndex={2}
                    mt={2}
                    p={2}
                    border="1px"
                    borderColor="gray.500"
                    borderRadius={5}
                    w="full"
                    onClick={() => {
                      setCenteredPosition({ lat: 0, lng: 0 })
                      setCenteredPosition(r.center)
                      setSelectedRoom(r.name)
                      setbtnOpen(index)
                    }}
                  >
                    <VStack p={2}>
                      <Text>{r.name}</Text>
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        as="i"
                        align="center"
                      >
                        {r.radius} m
                      </Text>
                    </VStack>
                  </Button>
                  <motion.div
                    animate={btnOpen === index ? 'open' : 'closed'}
                    variants={variants}
                  >
                    <Button
                      onClick={() => {
                        setJoinRoom(index)
                      }}
                      mt={2}
                      w="full"
                      zIndex={0}
                    >
                      join
                    </Button>
                  </motion.div>
                  {joinRoom === index && (
                    <JoinModal
                      isOpen={true}
                      setJoinRoom={setJoinRoom}
                      room={r}
                      userId={user.uid}
                    />
                  )}
                </div>
              )
            }
          })
        ) : (
          <p>no room available, create one !</p>
        )}
      </Box>

      <Box w="100vw" display={{ base: 'block', md: 'none' }} p={5}>
        <IconButton
          onClick={() => setBtnOpen('1')}
          icon={<ChevronLeftIcon />}
        />{' '}
        <Box textAlign="center">
          <Heading as="h4">Rooms</Heading>
          <Button onClick={onOpen} w="full" mb={2}>
            new room
          </Button>
          <CreateRoomModal
            newRoomData={newRoomData}
            isOpen={isOpen}
            onClose={onClose}
            setNewRoomData={setNewRoomData}
            handleClick={handleClick}
            errors={errors}
          />
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
        {rooms?.length > 0 ? (
          rooms.map((r, index) => {
            if (r.users.includes(user.uid)) return
            if (
              /*  r.center.lat > coords.lat - 0.45 &&
            r.center.lat < coords.lat + 0.45 &&
            r.center.lng > coords.lng - 0.45 &&
            r.center.lng < coords.lng + 0.45 */
              true
            ) {
              return (
                <div key={r.id}>
                  <Button
                    zIndex={2}
                    mt={2}
                    p={2}
                    border="1px"
                    borderColor="gray.500"
                    borderRadius={5}
                    w="full"
                    onClick={() => {
                      setCenteredPosition({ lat: 0, lng: 0 })
                      setCenteredPosition(r.center)
                      setSelectedRoom(r.name)
                      setbtnOpen(index)
                    }}
                  >
                    <VStack p={2}>
                      <Text>{r.name}</Text>
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        as="i"
                        align="center"
                      >
                        {r.radius} m
                      </Text>
                    </VStack>
                  </Button>
                  <motion.div
                    animate={btnOpen === index ? 'open' : 'closed'}
                    variants={variants}
                  >
                    <Button
                      onClick={() => {
                        setJoinRoom(index)
                      }}
                      mt={2}
                      w="full"
                      zIndex={0}
                    >
                      join
                    </Button>
                  </motion.div>
                  {joinRoom === index && (
                    <JoinModal
                      isOpen={true}
                      setJoinRoom={setJoinRoom}
                      room={r}
                      userId={user.uid}
                    />
                  )}
                </div>
              )
            }
          })
        ) : (
          <p>no room available, create one !</p>
        )}
      </Box>
    </>
  )
}

export default Rooms
