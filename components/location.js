import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Box } from '@chakra-ui/layout'
const Location = ({
  coords,
  selectedRadius,
  setSelectedRadius,
  centeredPosition,
  roomsData,
  selectedRoom
}) => {

  useEffect(() => {
    console.log(selectedRoom)
  }, [selectedRoom])

  const googlemap = useRef(null)
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
      version: 'weekly'
    })

    loader.load().then(res => {
      const myPosition = { lat: coords.lat, lng: coords.lng }
      const map = new google.maps.Map(googlemap.current, {
        center: centeredPosition !== null ? centeredPosition : myPosition,
        zoom: 7
      })
      if (selectedRoom !== null) {
        addMarker(centeredPosition, map)
      }

      roomsData.map(r => {
        if (selectedRadius === 'croissant') {
          const cityCircle = new google.maps.Circle({
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000',
            fillOpacity: 0.35,
            map,
            center: r.center,
            radius: Math.sqrt(r.radius) * 100
          })
        } else {
          if (Number(selectedRadius) >= Number(r.radius)) {
            const cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map,
              center: r.center,
              radius: Math.sqrt(r.radius) * 100
            })
          }
        }
      })
      const cityCircle = new google.maps.Circle({
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.35,
        map,
        center: myPosition,
        radius: Math.sqrt(100)
      })
      // cityCircle.setMap(map)
    })
  }, [selectedRadius, centeredPosition])

  // Adds a marker to the map.
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    console.log(location, 'location')
    new google.maps.Marker({
      position: location,
      label: selectedRoom,
      map: map
    })
  }

  return (
    <div>
      location
      <Box w="xl" h={500}>
        <p>
          lat: {coords.lat}, lng: {coords.lng}
        </p>
        <div
          style={{ width: '100%', height: '100%' }}
          id="map"
          ref={googlemap}
        />
      </Box>
    </div>
  )
}

export default Location
