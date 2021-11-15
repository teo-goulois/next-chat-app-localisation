import Header from '../components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Location from '../components/location'
import MyRoom from '../components/MyRoom'
import Rooms from '../components/Rooms'
import { Box } from '@chakra-ui/layout'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { db } from '../firebase/initFirebase'

export default function Home() {
  const [roomsData, setRoomsData] = useState(null)
  const [selectedRadius, setSelectedRadius] = useState('croissant')
  const [centeredPosition, setCenteredPosition] = useState(null)
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0
  })

  useEffect(() => {
    console.log(centeredPosition)
  }, [centeredPosition])

  useEffect(() => {
    const getQuery = async () => {
      const querySnapshot = await getDocs(collection(db, 'rooms'))
      setRoomsData(querySnapshot)
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data().name}`)
      })
    }
    getQuery()
    getLocation()
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const geoSuccess = position => {
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    setCoords({ lat: lat, lng: lng })
  }

  const geoError = () => {
    alert('geo failed')
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <MyRoom />
      <Tabs align="center" variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Conversation</Tab>
          <Tab>Friends</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Location
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              coords={coords}
              centeredPosition={centeredPosition}
            />
          </TabPanel>
          <TabPanel>
            <p>Conversation!</p>
          </TabPanel>
          <TabPanel>
            <p>friends!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Rooms
        selectedRadius={selectedRadius}
        setSelectedRadius={setSelectedRadius}
        coords={coords}
        setCenteredPosition={setCenteredPosition}
        roomsData={roomsData}
      />
    </Box>
  )
}
