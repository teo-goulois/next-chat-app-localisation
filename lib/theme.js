// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props)
    }
  })
}

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
// 2. Add your color mode config
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  }

const theme = extendTheme({ colors, styles, config })

export default theme