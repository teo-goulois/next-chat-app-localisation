import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import HomePage from './map'
const Location = ({
  coords,
  selectedRadius,
  setSelectedRadius,
  centeredPosition
}) => {
  return (
    <div>
      location
      <Box w="xl" h={500}>
        <HomePage
          selectedRadius={selectedRadius}
          setSelectedRadius={setSelectedRadius}
          coords={coords}
          centeredPosition={centeredPosition}
        />
      </Box>
    </div>
  )
}

export default Location
