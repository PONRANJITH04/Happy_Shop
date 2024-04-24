import CartItem from "../CartItem/CartItem";

const CartList = ({cartList}) => {


  return (
    <ul className="cart-list">
    {cartList.map(eachCartItem => (
      <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
    ))}
  </ul>
  );
}

export default CartList;
