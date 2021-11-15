import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../lib/theme'
import Layout from '../components/layouts/main'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>prechat</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Layout router={router}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp
