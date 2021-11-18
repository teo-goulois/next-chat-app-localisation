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
import Conversation from '../components/Conversation'
import { getRooms } from '../src/hook/firebase'

export default function Home() {
  const [roomsData, setRoomsData] = useState([]) // get rooms data
  const [selectedRadius, setSelectedRadius] = useState('croissant')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [centeredPosition, setCenteredPosition] = useState(null)
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0
  })
  const [loading, setLoading] = useState(true)
  const [queryLoaded, setQueryLoaded] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    getRooms(setRoomsData, setQueryLoaded)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
      setInterval(function () {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
      }, 15000000)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }, [])

  const geoSuccess = position => {
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    setCoords({ lat: lat, lng: lng })
    setLoading(false)
  }
  const geoError = () => {
    alert('geo failed')
  }

  const handleTabsChange = index => {
    setTabIndex(index)
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <MyRoom setActiveRoom={setActiveRoom} setTabIndex={setTabIndex} />

      <Tabs
        index={tabIndex}
        mt={4}
        align="center"
        variant="soft-rounded"
        colorScheme="green"
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Map</Tab>
          <Tab>Conversation</Tab>
          <Tab>Friends</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading === false && (
              <Location
                selectedRadius={selectedRadius}
                setSelectedRadius={setSelectedRadius}
                coords={coords}
                centeredPosition={centeredPosition}
                roomsData={roomsData}
                selectedRoom={selectedRoom}
              />
            )}
          </TabPanel>
          <TabPanel>
            <Conversation activeRoom={activeRoom} />
          </TabPanel>
          <TabPanel>
            <p>friends!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {loading === false && queryLoaded ? (
        <Rooms
          selectedRadius={selectedRadius}
          setSelectedRadius={setSelectedRadius}
          coords={coords}
          setCenteredPosition={setCenteredPosition}
          roomsData={roomsData}
          setSelectedRoom={setSelectedRoom}
        />
      ) : null}
    </Box>
  )
}
