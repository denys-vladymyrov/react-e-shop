import { useState } from "react"
import { useDispatch } from "react-redux"

import { signUpStart } from "../../store/user/user.action"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import './sing-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }

    try {
      dispatch(signUpStart(email, password, displayName))
      // resetFormFields()
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      }
      else {
        console.log(error)
      }
    }
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitHandler}>

        <FormInput
          label="Display name"
          type="text"
          required
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default SignUpForm