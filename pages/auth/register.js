import React, { useState } from 'react'
import Router from 'next/router'
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
  useColorModeValue
} from '@chakra-ui/react'
import { withPublic } from '../../src/hook/route'
import { postRegister } from '../../src/hook/firebase'
const Register = ({ auth }) => {
  const { user, createUserWithEmailAndPassword, error } = auth
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({
    passwordNoMatch: false
  })

  const handleClick = async () => {
    if (formData.password1 !== formData.password2) {
      setErrors({ ...errors, passwordNoMatch: true })
    } else {
      createUserWithEmailAndPassword(formData.email, formData.password1, formData.username)
      // postRegister(formData)
      Router.push('/')
      console.log(error)
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
          Register
        </Heading>
        <Stack p={2}>
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input
            isInvalid={errors.invalidusername}
            errorBorderColor="crimson"
              onChange={e =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
            ></Input>
             {errors.invalidusername ? (
              <FormHelperText color="red.300">
                must be 3 characteres
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <FormLabel>email</FormLabel>
            <Input
            isInvalid={errors.invalidemail}
            errorBorderColor="crimson"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
            ></Input>
             {errors.invalidemail ? (
              <FormHelperText color="red.300">
                the email was not valid
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <FormLabel>password</FormLabel>
            <Input
              isInvalid={errors.passwordNoMatch || errors.weakpassword}
              errorBorderColor="crimson"
              onChange={e =>
                setFormData({ ...formData, password1: e.target.value })
              }
              type="password"
            />
            {errors.passwordNoMatch || errors.weakpassword ? (
              <FormHelperText color="red.300">
                {errors.passwordNoMatch && <p>the passwords don't matches</p>}
                {errors.weakpassword && <p>the passwords must containe 6 characteres</p>}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>password (again)</FormLabel>
            <Input
              isInvalid={errors.passwordNoMatch || errors.weakpassword}
              errorBorderColor="crimson"
              onChange={e =>
                setFormData({ ...formData, password2: e.target.value })
              }
              type="password"
            />
          </FormControl>
          <Button onClick={handleClick}>Send</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default withPublic(Register) 
