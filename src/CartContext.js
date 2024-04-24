import { createContext } from "react";

const CartContext = createContext({
    cartList: [],
    removeAllCartItems: () => {},
    addCartItem: () => {},
    removeCartItem: () => {},
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity: () => {},
  })

  function CartContextProvider ({children}) {
    return(
        <CartContext.Provider value={}>
            {children}
        </CartContext.Provider>
    )
  }

  export {CartContextProvider, CartContext.Con}