import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartItems.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartItems = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.success("Item removed from cart")
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart items removed successfully")
  };

  const handleIncrease = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const itemTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const deliveryFee = 20;
  const total = itemTotal + deliveryFee;

  if (cart.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Your Cart</h2>
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img
              src={item.imageUrl || "https://via.placeholder.com/100"}
              alt={item.name}
            />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.itemName || "Central Cafeteria"}</p>
              <p>₹{item.price} each</p>
              <div className="quantity-control">
                <button onClick={() => handleDecrease(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item._id)}>+</button>
              </div>
              <p>₹{(parseFloat(item.price) * item.quantity).toFixed(0)}</p>
              <p className="special">
                Special Instructions:
                <br />
                No special instructions
              </p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleRemove(item._id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>
          Items ({cart.length}): ₹{itemTotal.toFixed(0)}
        </p>
        <p>Delivery Fee: ₹{deliveryFee}</p>
        <h4>Total: ₹{total.toFixed(0)}</h4>
        <button className="checkout" onClick={() => navigate("/checkout")}>
          Proceed to Checkout →
        </button>
        ;{" "}
        <button className="clear-cart" onClick={handleClearCart}>
          Clear Cart 🗑️
        </button>
        <p className="continue">Continue Shopping</p>
      </div>
    </div>
  );
};

export default CartItems;
