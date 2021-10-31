import React from 'react'
import Head from 'next/head'
import Header from '../header'
import { Box, Container } from '@chakra-ui/layout'
import { AuthProvider } from '../../src/hook/auth'
import AuthStateChanged from '../../src/layout/AuthStateChanged'

function Main({ children, router }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Box as="main" pb={6}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>prechat</title>
          </Head>
          <Header path={router.asPath} />

          <Container>{children}</Container>
        </Box>
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default Main
