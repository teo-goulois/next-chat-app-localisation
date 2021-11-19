import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { format } from 'timeago.js'
// ui
import {
  Textarea,
  Button,
  Stack,
  Avatar,
  Box,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { AiOutlineUser } from '@chakra-ui/icons'
// firebase calls
import { getRoomMessages, postMessage, getUsersInfo } from '../src/hook/firebase'
// auth
import useAuth from '../src/hook/auth'

const Conversation = ({ activeRoom }) => {
  const auth = useAuth()
  const { user } = auth
  // states
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [usersInfo, setUsersInfo] = useState([])
  const [input, setInput] = useState('')

  /* useEffect(() => {
    const socket = io()
    socket.on('now', data => {
      setMessages(prev => [...prev, { text: data.message }])
    })
  }, []) */

  useEffect(() => {
    console.log(users, usersInfo)
  }, [usersInfo])

  useEffect(() => {
    console.log(users, 'get users');
    getUsersInfo(users, setUsersInfo)
  }, [users])

  useEffect(() => {
    getRoomMessages(activeRoom, setMessages, setUsers)
  }, [activeRoom])

  const handleClick = () => {
    postMessage(user, activeRoom, input)
    setMessages(prev => [...prev, { text: input, sender: user.uid }])
  }

  return (
    <Box h="100%">
      <Box display="flex" flexDirection="column">
        {typeof messages === 'string'
          ? messages
          : messages?.map(m => {
              if (m.sender === user.uid) {
                return <MyMessage key={m.id} m={m} user={user} />
              } else {
                const thisuser = usersInfo.filter(u => u.id === m.sender)
                return <HisMessage usersInfo={thisuser[0]} key={m.id} m={m} />
              }
            })}
      </Box>

      <Box position="relative" display="flex" alignItems="center">
        <Textarea
          resize="none"
          size="xs"
          onChange={e => setInput(e.target.value)}
        />
        <Button minHeight="80px" borderRadius={0} onClick={() => handleClick()}>
          send
        </Button>
      </Box>
    </Box>
  )
}

const MyMessage = ({ m, user }) => {
  return (
    <Box
      key={m.id}
      alignSelf="flex-end"
      border="1px"
      p={2}
      m={1}
      borderRadius={15}
      display="flex"
      alignItems="center"
      key={m.id}
      justifyContent="end"
      bg={useColorModeValue('#aa43ff33', '#aa43ff33')}
      w="fit-content"
    >
      <Box w="fit-content" textAlign="end">
        <Box w="100%" display="flex" justifyContent="space-between">
          <Text color={useColorModeValue('#575757', '#adadad')} as="i">
            {format(m.createdAt)}
          </Text>
          <Text pl={4} color={useColorModeValue('#575757', '#adadad')} as="i">
            you
          </Text>
        </Box>
        <Text>{m.text}</Text>
      </Box>

      <Avatar
        ml={2}
        size="md"
        name={user.displayName}
        src={user.photoURL}
      />
    </Box>
  )
}
const HisMessage = ({ m, usersInfo }) => {
  return (
    <Box
      key={m.id}
      alignSelf="start"
      w="fit-content"
      border="1px"
      p={2}
      m={1}
      borderRadius={15}
      display="flex"
      alignItems="center"
      key={m.id}
    >
      <Avatar
        mr={2}
        size="md"
        name={usersInfo?.username}
        src={usersInfo?.photoURL}
      />
      <Box textAlign="start">
        <Box w="100%" display="flex" justifyContent="space-between">
          <Text pr={4} color={useColorModeValue('#575757', '#adadad')} as="i">
          {usersInfo?.username} 
          </Text>
          <Text color={useColorModeValue('#575757', '#adadad')} as="i">
            {format(m.createdAt)}
          </Text>
        </Box>
        <Text>{m.text}</Text>
      </Box>
    </Box>
  )
}

export default Conversation
