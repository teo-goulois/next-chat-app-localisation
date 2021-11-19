import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  orderBy,
  setDoc
} from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../../firebase/initFirebase'

const postRegister = async (username, userId) => {
  const data = {
    username,
    photoURL: ''
  }
  try {
    await setDoc(doc(db, 'users', userId), data)
    console.log('doc added')
    const auth = getAuth()
    await updateProfile(auth.currentUser, {
      displayName: username
    })
    console.log('profile update')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const getRoomMessages = async (activeRoom, setMessages, setUsers) => {
  const roomsRef = collection(db, 'messages')
  const q = query(
    roomsRef,
    where('roomId', '==', activeRoom),
    orderBy('createdAt')
  )
  const querySnapshot = await getDocs(q)
  const sendersArray = new Set()
  if (querySnapshot.empty) {
    setMessages('no messages for now create the first one!')
  } else {
    setMessages([])
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const { roomId, sender, text, createdAt } = doc.data()
      sendersArray.add(sender)
      setMessages(prev => [
        ...prev,
        { roomId, sender, text, id: doc.id, createdAt }
      ])
    })
    console.log(sendersArray)
    setUsers(sendersArray)
  }
}

const getUsersInfo = async (users, setUsersInfo) => {
  const myArr = Array.from(users)
  console.log(myArr)
  myArr.map(async userId => {
    const docRef = doc(db, 'users', userId)
    const querySnapshot = await getDoc(docRef)
    console.log(querySnapshot.data());
    if (querySnapshot.data()) {
      console.log(querySnapshot.data());
      setUsersInfo(prev => [
        ...prev,
        {
          username: querySnapshot.data().username,
          id: userId,
          photoURL: querySnapshot.data().photoURL
        }
      ])
      console.log('success')
    }
  })
}

const getRooms = async (setRoomsData, setQueryLoaded) => {
  const querySnapshot = await getDocs(collection(db, 'rooms'))
  let tempArray = []
  querySnapshot.forEach(doc => {
    tempArray.push({
      name: doc.data().name,
      center: doc.data().center,
      radius: doc.data().radius,
      users: doc.data().users,
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
      description: newRoomData.description,
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

const postMessage = async (user, activeRoom, input) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      roomId: activeRoom,
      sender: user.uid,
      text: input,
      createdAt: Date.now()
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const putProfile = userInfos => {
  const auth = getAuth()
  updateProfile(auth.currentUser, {
    displayName: userInfos.username,
    photoURL: userInfos.photoURL,
    email: userInfos.email
  })
    .then(() => {
      // Profile updated!
      // ...
      console.log('profile updated')
    })
    .catch(error => {
      // An error occurred
      // ...
      console.log('err')
    })
}

const joinRoom = async (id, userId) => {
  const roomsref = doc(db, 'rooms', id)
  try {
    // Atomically add a new region to the "regions" array field.
    await updateDoc(roomsref, {
      users: arrayUnion(userId)
    })
    console.log('success')
  } catch (e) {
    console.log('Transaction failed: ', e)
  }
}

export {
  getRoomMessages,
  getRooms,
  postRoom,
  getMyRooms,
  postMessage,
  putProfile,
  joinRoom,
  getUsersInfo,
  postRegister
}
