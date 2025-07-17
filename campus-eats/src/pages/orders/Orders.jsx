import React, { useEffect } from "react";
import { useOrders } from "../../context/OrderContext";
import { useUserAuth } from "../../context/UserAuthContext";
import './Orders.css'
const Orders = () => {
  const { user } = useUserAuth();
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    if (user?.email) {
      fetchOrders(user.email);
    }
  }, [user]);

  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className="order-card" key={order._id || index}>
            <h3>
              Order #
              {order._id?.slice(-5).toUpperCase() || `ORD-00${index + 1}`}
            </h3>
            <p>
              <strong>🕒</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <strong>Items Ordered:</strong>
            </p>
            {Array.isArray(order.cart) &&
              order.cart.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.itemName}</strong> × {item.quantity}
                </p>
              ))}

            <p>
              <strong>From:</strong>
              <br />
              {order.cart?.[0]?.canteenName || "Canteen"}
            </p>
            <p>
              <strong>📍 Delivery Address:</strong>
              <br />
              {order.address}
            </p>
            <p>
              💳 {order.paymentMethod} -{" "}
              <span className="status-tag">{order.status}</span>
            </p>

            <hr />
            <p>
              <strong>Total Amount:</strong> ₹{order.total}
            </p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
