import { useSelector, useDispatch } from "react-redux"
import {ShippingIcon, CartIconContainer, ItemCount} from  './cart-icon.styles'

import {selectIsCartOpen, selectCartCount} from "../../store/cart/cart.selector"
import {setIsCartOpen} from "../../store/cart/cart.reducer"


const CartIcon = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)


  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShippingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon