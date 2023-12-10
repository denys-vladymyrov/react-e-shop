import { useState } from "react"
import { useDispatch } from "react-redux"

import FormInput from "../form-input/form-input.component"
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component"

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields


  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
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
          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm