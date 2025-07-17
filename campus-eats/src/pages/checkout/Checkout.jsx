import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext"; // ✅ added
import "./Checkout.css";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useUserAuth();
  const { addOrder } = useOrders(); // ✅ added
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const deliveryAddress = user?.college || "Not Provided";

  const itemTotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const deliveryFee = 20;
  const total = itemTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    const orderDetails = {
      cart,
      address: deliveryAddress,
      paymentMethod,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
      user: user?.email || "guest",
    };
    // console.log(orderDetails);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/orders/post",
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) throw new Error("Failed to place order");

      const savedOrder = await response;
      console.log(savedOrder.data);

      addOrder(savedOrder.data); // ✅ update context

      navigate("/orders"); // ✅ redirect to orders page
    } catch (error) {
      console.log("Error placing order:", error);
      // alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <p>Complete your order details</p>

      {/* Order Summary */}
      <div className="card">
        <h2>🛒 Order Summary</h2>
        {cart.map((item) => (
          <div key={item._id} className="summary-item">
            <span>{item.itemName}</span>
            <span>
              ₹{item.price} × {item.quantity}
            </span>
          </div>
        ))}
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹{itemTotal}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Fee:</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="total-row">
          <span>Total:</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
      </div>

      {/* Delivery & Payment */}
      <div className="card">
        <h2>📦 Delivery & Payment Details</h2>

        <label>📍 Delivery Address</label>
        <div className="summary-item delivery-address-box">
          {deliveryAddress}
        </div>

        <label>💳 Payment Method</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            UPI
          </label>
          <label>
            <input
              type="radio"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>
        </div>

        <label>📝 Special Instructions (Optional)</label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          rows={2}
        />

        <div className="checkout-buttons">
          <button className="back-button" onClick={() => navigate("/cart")}>
            ← Back to Cart
          </button>
          <button className="place-button" onClick={handlePlaceOrder}>
            Place Order - ₹{total.toFixed(0)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
