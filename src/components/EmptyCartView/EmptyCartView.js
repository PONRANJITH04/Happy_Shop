import "./index.css"
import Button from "../Button/Button";

const EmptyCartView = () => {
  return (
    <div className="cart-empty-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="cart-empty-img"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
    <Button type="button" className="shop-now-btn">
        Shop Now
    </Button>
  </div>
  );
}

export default EmptyCartView;
