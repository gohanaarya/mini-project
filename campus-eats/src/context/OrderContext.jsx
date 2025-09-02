import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { token } = useUserAuth(); // get token from auth context
  
  const [orders, setOrders] = useState([]);
  const [fetched, setFetched] = useState(false);

  const fetchOrders = async (userEmail) => {
    if (!fetched && userEmail) {
      try {
        if (!token) return; 
        const res = await axios.get(`https://mini-project-n8cx.onrender.com/api/orders/list?userEmail=${userEmail}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res;
        // console.log(data)
        setOrders(data.data.reverse()); // Latest orders first
        setFetched(true);
      } catch (err) {
        console.log("Failed to fetch orders", err);
      }
    }
  };

  const addOrder = async(order) => {
    setOrders((prev) => [order, ...prev]);
    toast.success("Order placed successfully!");

  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
