import React from 'react'
import Header from '../header'
import { Box, Container } from '@chakra-ui/layout'
import { AuthProvider } from '../../src/hook/auth'
import AuthStateChanged from '../../src/layout/AuthStateChanged'

function Main({ children, router }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Box as="main" pb={6}>
          <Header path={router.asPath} />

          <Container maxW={'container.xl'}>{children}</Container>
        </Box>
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default Main
