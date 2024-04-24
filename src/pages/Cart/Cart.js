import React from 'react';
import Button from '../../components/Button/Button';
import EmptyCartView from '../../components/EmptyCartView/EmptyCartView';
import CartList from '../../components/CartList/CartList';
import CartSummary from '../../components/CartSummary/CartSummary';
import './cart.css'


const Cart = () => {

  const onClickRemoveAllBtn = () => {
    
  }
  return (
    <div>
     <div className="cart-container">
            {EmptyCartView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <Button type="button" className="remove-all-btn" onClick={onClickRemoveAllBtn}>
                  Remove All
                </Button>
                <CartList />
                <CartSummary />
              </div>
            )}
          </div>
    </div>
  );
}

export default Cart;
