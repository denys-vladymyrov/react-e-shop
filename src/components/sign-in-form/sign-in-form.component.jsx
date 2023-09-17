import { useState, useContext } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { UserContext } from "../../context/user.context"

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const { setCurrentUser } = useContext(UserContext)

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)

      setCurrentUser(user)
      resetFormFields()
    }
    catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(error)
      }
    }
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm