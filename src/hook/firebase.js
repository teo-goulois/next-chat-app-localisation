import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/initFirebase'

const getRoomMessages = async (activeRoom, setMessages) => {
  const roomsRef = collection(db, 'messages')
  const q = query(roomsRef, where('roomId', '==', activeRoom))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) {
    setMessages('no messages for now create the first one!')
  } else {
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      setMessages(prev => [...prev, doc.data()])
    })
  }
}

const getRooms = async (setRoomsData, setQueryLoaded) => {
  const querySnapshot = await getDocs(collection(db, 'rooms'))
  let tempArray = []
  querySnapshot.forEach(doc => {
    tempArray.push({
      name: doc.data().name,
      center: doc.data().center,
      radius: doc.data().radius,
      id: doc.id
    })
  })
  setRoomsData(tempArray)
  setQueryLoaded(true)
}

const postRoom = async (newRoomData, coords, user, onClose) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), {
      name: newRoomData.name,
      center: coords,
      radius: newRoomData.radius,
      users: [user.uid]
    })
    console.log('Document written with ID: ', docRef.id)
    onClose()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const getMyRooms = async (user, setMyRooms, setMyRoom) => {
  let tempArray = []
  const roomsRef = collection(db, 'rooms')
  const q = query(roomsRef, where('users', 'array-contains', user.uid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data())
    tempArray.push({
      name: doc.data().name,
      center: doc.data().center,
      radius: doc.data().radius,
      id: doc.id
    })
  })
  setMyRooms(tempArray)
  setMyRoom(tempArray)
}

export { getRoomMessages, getRooms, postRoom, getMyRooms }
