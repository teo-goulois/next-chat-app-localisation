import React, { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
// auth
import useAuth from '../src/hook/auth'
// ui
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Container,
  Avatar,
  Button
} from '@chakra-ui/react'
// firebase calls
import { putProfile } from '../src/hook/firebase'
import e from 'cors'
import { withProtected } from '../src/hook/route'

const Profile = () => {
  const auth = useAuth()
  const { user } = auth
  // states
  const [userInfos, setUserInfos] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(user)
    setUserInfos({
      ...userInfos,
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      firstname: user.firstname,
      lastname: user.lastname
    })
    setLoading(false)
  }, [])

  useEffect(() => {
      console.log(userInfos);
  }, [userInfos])

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address'
    }
    return error
  }

  function validateUsername(value) {
    let error
    let message
    if (!value) {
      message = 'Email is required'
    } else if (value.length < 5) {
      error = 'Must be 5 characters or more'
    }
    return error
  }
  function validateFirstname(value) {
    let error
    let message
    if (!value) {
      message = 'Email is required'
    } else if (value.length >= 15) {
      error = 'Must be 15 characters or less'
    }
    return error
  }
  function validateLastname(value) {
    let error
    let message
    if (!value) {
      message = 'Email is required'
    } else if (value.length >= 5) {
      error = 'Must be 15 characters or less'
    }
    return error
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      putProfile(userInfos)
  }

  if (loading) return <div>loading...</div>
  return (
    <Container>
      <Box>
        <Avatar name={userInfos.username} src={userInfos.photoURL} />
        <Formik
          initialValues={userInfos}
          
        >
          {props => (
            <form onSubmit={handleSubmit}>
              <Field name="username" validate={validateUsername}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="username"
                      value={userInfos.username}
                      onChange={e =>
                        setUserInfos({ ...userInfos, username: e.target.value })
                      }
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="email"
                      onChange={e =>
                        setUserInfos({ ...userInfos, email: e.target.value })
                      }
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="firstname" validate={validateFirstname}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.firstname && form.touched.firstname}
                  >
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Input
                      {...field}
                      id="firstname"
                      placeholder="firstname"
                      onChange={e =>
                        setUserInfos({
                          ...userInfos,
                          firstname: e.target.value
                        })
                      }
                    />
                    <FormErrorMessage>{form.errors.firstname}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="lastname" validate={validateLastname}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.lastname && form.touched.lastname}
                  >
                    <FormLabel htmlFor="lastname">lastname</FormLabel>
                    <Input
                      {...field}
                      id="lastname"
                      placeholder="lastname"
                      onChange={e =>
                        setUserInfos({ ...userInfos, lastname: e.target.value })
                      }
                    />
                    <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default withProtected(Profile) 
