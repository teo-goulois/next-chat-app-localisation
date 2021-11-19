import React, { useState } from 'react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Container,
  Heading,
  Stack,
  Input,
  Button,
  useColorModeValue,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { withPublic } from '../../src/hook/route'

const Login = ({ auth }) => {
  const { user, loginUserWithEmailAndPassword, error } = auth

  const [show, setShow] = React.useState(false)
  const handleShow = () => setShow(!show)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState('')

  const handleClick =  () => {
    loginUserWithEmailAndPassword(formData.email, formData.password1)
    if (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <Box>
      <Container
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        borderRadius={5}
        mt={5}
        alignItems="center"
      >
        <Heading p={4} textAlign="center" as="h2">
          Login
          <h3>{user?.uid}</h3>
        </Heading>
        <Stack p={2}>
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input
              isInvalid={errors !== ''}
              errorBorderColor="crimson"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
            ></Input>
          </FormControl>

          <FormControl>
            <FormLabel>password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? 'text' : 'password'}
                isInvalid={errors !== ''}
                errorBorderColor="crimson"
                onChange={e =>
                  setFormData({ ...formData, password1: e.target.value })
                }
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            {errors !== '' ? (
              <FormHelperText color="red.300">{errors}</FormHelperText>
            ) : null}
          </FormControl>
          <Button onClick={handleClick}>Send</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default withPublic(Login)
