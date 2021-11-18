import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
// ui
import { Textarea, Button, Stack } from '@chakra-ui/react'
// firebase calls
import { getRoomMessages } from '../src/hook/firebase'

const Conversation = ({ activeRoom }) => {
  const [messages, setMessages] = useState([])

  /* useEffect(() => {
    const socket = io()
    socket.on('now', data => {
      setMessages(prev => [...prev, { text: data.message }])
    })
  }, []) */



  useEffect(() => {
    getRoomMessages(activeRoom, setMessages)
    console.log(messages, activeRoom)
  }, [activeRoom])

  const handleClick = () => {}

  return (
    <div>
      {typeof messages === 'string'
        ? messages
        : messages?.map(m => <div>{m.text}</div>)}
      <Stack direction="row" alignItems="center">
        <Textarea />
        <Button onClick={handleClick}>send</Button>
      </Stack>
    </div>
  )
}

export default Conversation
