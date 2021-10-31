import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import useAuth from '../hook/auth'
import { auth } from '../../firebase/initFirebase'

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return children
}
