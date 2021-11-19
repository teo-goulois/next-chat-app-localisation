import React from 'react'
import Header from '../header'
import { Box, Container } from '@chakra-ui/layout'
import { AuthProvider } from '../../src/hook/auth'
import AuthStateChanged from '../../src/layout/AuthStateChanged'

function Main({ children, router }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Box h='100%' as="main">
          <Header path={router.asPath} />

          <Container p={0} h='100%' maxW={'container.xl'}>{children}</Container>
        </Box>
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default Main
