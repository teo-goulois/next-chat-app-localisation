import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDzw-ITHWkOA4o29lDSfX0ZY8iqq2MOits',
  authDomain: 'chat-app-localisation.firebaseapp.com',
  projectId: 'chat-app-localisation',
  storageBucket: 'chat-app-localisation.appspot.com',
  messagingSenderId: '826320291562',
  appId: '1:826320291562:web:03597798b3e668b4fbb993',
  measurementId: 'G-1G72RD1HLD'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
