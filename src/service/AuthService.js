import { auth } from '../../firebase/initFirebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut
} from 'firebase/auth'


export const AuthService = {
  CreateUserWithEmailAndPassword: async (email, password) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      return {
        user: userCred.user
      }
    } catch (e) {
      const errorCode = e.code
      const errorMessage = e.message
      return { error: errorMessage }
    }
  },
  loginUserWithEmailAndPassword: async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      return {
        user: userCred.user
      }
    } catch (e) {
      const errorMessage = e.message
      return { error: errorMessage }
    }
  },

  logout: () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      })
  }
}
