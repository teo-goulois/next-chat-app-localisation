import { Button } from '@chakra-ui/button'
import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import React from 'react'

const MyRoom = () => {
  return (
    <Box p={5}>
      <Box>
        <Heading mb={2} as="h4">
          My Room
        </Heading>
        <Box>
          <Select placeholder="radius">
            <option value="option1">100 m</option>
            <option value="option2">500 m</option>
            <option value="option3">1 km</option>
            <option value="option3">5 km</option>
          </Select>
        </Box>
      </Box>
      <Divider />
      <Stack>
        <Button
          mt={2}
          p={2}
          border="1px"
          borderColor="gray.500"
          borderRadius={5}
        >
          <Text>nom de Room</Text>
        </Button>
        <Button
          mt={2}
          p={2}
          border="1px"
          borderColor="gray.500"
          borderRadius={5}
        >
          <Text>nom de Room</Text>
        </Button>
      </Stack>
    </Box>
  )
}

export default MyRoom
