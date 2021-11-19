import Header from '../components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Location from '../components/location'
import MyRoom from '../components/MyRoom'
import Rooms from '../components/Rooms'
import { Box } from '@chakra-ui/layout'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Conversation from '../components/Conversation'
import { getRooms } from '../src/hook/firebase'
import { withProtected } from '../src/hook/route'
import { CloseIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
// animation
import { motion } from 'framer-motion'

const variantsMyRoom = {
  open: { opacity: 1, display: 'block', width: '100vw' },
  closed: { opacity: 0, display: 'none' }
}
const variantsLocation = {
  open: { opacity: 1, display: 'block', width: '100vw' },
  closed: { opacity: 0, display: 'none' }
}
const variantsRooms = {
  open: { opacity: 1, display: 'block', width: '100vw' },
  closed: { opacity: 0, display: 'none' }
}

function Home() {
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
  const [btnOpen, setBtnOpen] = useState('1')

  useEffect(() => {
    getRooms(setRoomsData, setQueryLoaded)
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
        enableHighAccuracy: true,
        timeout: 5000
      })
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
  }
  const geoError = () => {
    alert('geo failed')
  }

  const handleTabsChange = index => {
    setTabIndex(index)
  }

  return (
    <>
      <Box
        h="100%"
        display={{ base: 'none', md: 'flex' }}
        justifyContent="space-between"
      >
        <MyRoom setActiveRoom={setActiveRoom} setTabIndex={setTabIndex} />

        <Tabs
          w="100%"
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
          </TabList>

          <TabPanels>
            <TabPanel>
              {queryLoaded ? (
                <Location
                  selectedRadius={selectedRadius}
                  setSelectedRadius={setSelectedRadius}
                  coords={coords}
                  centeredPosition={centeredPosition}
                  roomsData={roomsData}
                  selectedRoom={selectedRoom}
                />
              ) : (
                <div>loading...</div>
              )}
            </TabPanel>
            <TabPanel>
              <Conversation activeRoom={activeRoom} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {queryLoaded ? (
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

      <Box
        h="100%"
        display={{ base: 'flex', md: 'none' }}
        justifyContent="space-between"
      >
        <motion.div
          animate={btnOpen === '0' ? 'open' : 'closed'}
          variants={variantsMyRoom}
        >
          <MyRoom
            setActiveRoom={setActiveRoom}
            setTabIndex={setTabIndex}
            setBtnOpen={setBtnOpen}
          />
        </motion.div>

        <motion.div
          animate={btnOpen === '1' ? 'open' : 'closed'}
          variants={variantsLocation}
        >
          <Tabs
            index={tabIndex}
            mt={2}
            w="100vw"
            align="center"
            variant="soft-rounded"
            colorScheme="green"
            onChange={handleTabsChange}
          >
            <Box p={2} display="flex" justifyContent="space-between">
              <IconButton
                onClick={() => setBtnOpen('0')}
                icon={<ChevronLeftIcon />}
              />
              <TabList pb={2}>
                <Tab>Map</Tab>
                <Tab>Conversation</Tab>
              </TabList>
              <IconButton
                onClick={() => setBtnOpen('2')}
                icon={<ChevronRightIcon />}
              />
            </Box>

            <TabPanels>
              <TabPanel p={0}>
                {queryLoaded ? (
                  <Location
                    selectedRadius={selectedRadius}
                    setSelectedRadius={setSelectedRadius}
                    coords={coords}
                    centeredPosition={centeredPosition}
                    roomsData={roomsData}
                    selectedRoom={selectedRoom}
                  />
                ) : (
                  <div>loading...</div>
                )}
              </TabPanel>
              <TabPanel>
                <Conversation activeRoom={activeRoom} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </motion.div>
        <motion.div
          animate={btnOpen === '2' ? 'open' : 'closed'}
          variants={variantsRooms}
        >
          {queryLoaded ? (
            <Rooms
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              coords={coords}
              setCenteredPosition={setCenteredPosition}
              roomsData={roomsData}
              setSelectedRoom={setSelectedRoom}
              setBtnOpen={setBtnOpen}
            />
          ) : null}
        </motion.div>
      </Box>
    </>
  )
}
export default withProtected(Home)
