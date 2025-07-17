import React, { createContext, useReducer, useContext, useEffect } from "react";

// Initial cart state from localStorage (or empty)
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartContext = createContext();

const cartReducer = (state, action) => {
  let updatedCart;

  switch (action.type) {
    case "ADD_ITEM": {
      
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        // console.log(existingItem)
        // If item exists, increment quantity
        updatedCart = state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item 
        );
        // console.log(updatedCart)
      } else {
        // Else add with quantity 1
        updatedCart = [...state, { ...action.payload, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    }

    case "INCREMENT": {
      updatedCart = state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    }

    case "DECREMENT": {
      updatedCart = state
        .map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // remove if quantity becomes 0

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    }

    case "REMOVE_ITEM":
      updatedCart = state.filter(item => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return [];

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "LOAD_CART", payload: savedCart });
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
