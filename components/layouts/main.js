import React, { Children } from 'react'
import Head from 'next/head'
import Header from '../header'
import { Container } from '@chakra-ui/layout'

function Main({ children, router}) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>prechat</title>
      </Head>

      <Header path={router.asPath} />

      <Container>
        {children}
      </Container>
    </div>
  )
}

export default Main
