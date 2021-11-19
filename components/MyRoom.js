import React, { useEffect, useState } from 'react'
// ui
import { Button } from '@chakra-ui/button'
import { Box, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'

import { Select } from '@chakra-ui/select'
// auth
import useAuth from '../src/hook/auth'
// firebase calls
import { getMyRooms } from '../src/hook/firebase'
import { CloseIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

const MyRoom = ({ setActiveRoom, setTabIndex, setBtnOpen }) => {
  const auth = useAuth()
  const { user } = auth
  // states
  const [myRooms, setMyRooms] = useState(null)
  const [myRoom, setMyRoom] = useState(null)
  const [selectedRadius, setSelectedRadius] = useState('croissant')

  useEffect(() => {
    getMyRooms(user, setMyRooms, setMyRoom)
  }, [])

  // handle radius change
  const handleChange = e => {
    setSelectedRadius(e.target.value)
  }

  useEffect(() => {
    if (selectedRadius === 'croissant') {
      let nroom = myRooms?.sort((a, b) => Number(a.radius) - Number(b.radius))
      console.log(nroom)
      setMyRoom(nroom)
    } else {
      let nroom = myRooms?.filter(
        r => Number(selectedRadius) >= Number(r.radius)
      )
      setMyRoom(nroom)
    }
  }, [selectedRadius])

  return (
    <>
      <Box display={{ base: 'none', md: 'block' }} p={5}>
        <Box>
          <Heading mb={2} as="h4">
            My Room
          </Heading>
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
        <Stack>
          {myRoom?.map(r => (
            <Button
              key={r.id}
              mt={2}
              p={2}
              border="1px"
              borderColor="gray.500"
              borderRadius={5}
              onClick={() => {
                setActiveRoom(r.id)
                setTabIndex(1)
              }}
            >
              <VStack p={2}>
                <Text>{r.name}</Text>
                <Text fontSize="xs" color="gray.400" as="i" align="center">
                  {r.radius} m
                </Text>
              </VStack>
            </Button>
          ))}
        </Stack>
      </Box>

      <Box display={{ base: 'flex', md: 'none' }} flexDirection='column' w="100vw" p={5}>
        <IconButton
          alignSelf='end'
          onClick={() => setBtnOpen('1')}
          icon={<ChevronRightIcon />}
        />
        <Box textAlign="center">
          <Heading mb={2} as="h4">
            My Room
          </Heading>
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
        <Stack>
          {myRoom?.map(r => (
            <Button
              key={r.id}
              mt={2}
              p={2}
              border="1px"
              borderColor="gray.500"
              borderRadius={5}
              onClick={() => {
                setActiveRoom(r.id)
                setTabIndex(1)
              }}
            >
              <VStack p={2}>
                <Text>{r.name}</Text>
                <Text fontSize="xs" color="gray.400" as="i" align="center">
                  {r.radius} m
                </Text>
              </VStack>
            </Button>
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default MyRoom
