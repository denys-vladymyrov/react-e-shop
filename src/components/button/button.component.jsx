import { BaseButton, GoogleSignInButton, InvertedInButton } from "./button.styles"


export const BUTTON_TYPES_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => (
  {
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPES_CLASSES.inverted]: InvertedInButton,
  }[buttonType]
)

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType)

  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}

export default Button