import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCaT8QUORFZ5U5BH6h__46WSKeVjUZXQcg",
  authDomain: "react-e-shop-1d3ca.firebaseapp.com",
  projectId: "react-e-shop-1d3ca",
  storageBucket: "react-e-shop-1d3ca.appspot.com",
  messagingSenderId: "382654091088",
  appId: "1:382654091088:web:c487b6480ddf97f3d42655"
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const SignInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const SignInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userShapshot = await getDoc(userDocRef)

  if (!userShapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}