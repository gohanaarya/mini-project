import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CanteenProvider } from "./context/CanteenContext.jsx";
import { CanteenItemsProvider } from "./context/CanteenItemsContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
        <CartProvider>
          <CanteenProvider>
            <CanteenItemsProvider>
              <OrderProvider>
                <App />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </OrderProvider>
            </CanteenItemsProvider>
          </CanteenProvider>
        </CartProvider>
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>
);
