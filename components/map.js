import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import jsonRooms from '../rooms.json'

function HomePage({ selectedRadius, setSelectedRadius, coords, centeredPosition }) {
  const googlemap = useRef(null)
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
      version: 'weekly'
    })
    loader.load().then(res => {
      console.log(res)
      const myPosition = { lat: coords.lat, lng: coords.lng }
      const map = new google.maps.Map(googlemap.current, {
        center: centeredPosition !== null ? centeredPosition : myPosition,
        zoom: 7
      })
      const marker = new google.maps.Marker({
        position: myPosition,
        map: map
      })

      jsonRooms.map(r => {
        console.log(r.radius)
        if (selectedRadius === 'croissant') {
          const cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map,
            center: r.center,
            radius: Math.sqrt(r.radius) 
          })
        } else {
          console.log(typeof selectedRadius, typeof r.radius);
          if (selectedRadius === r.radius) {
            const cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map,
              center: r.center,
              radius: Math.sqrt(r.radius)
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
  return (
    <>
      <p>
        lat: {coords.lat}, lng: {coords.lng}
      </p>
      <div style={{ width: '100%', height: '100%' }} id="map" ref={googlemap} />
    </>
  )
}

export default HomePage
