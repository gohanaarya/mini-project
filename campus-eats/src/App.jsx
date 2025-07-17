import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./pages/Navbar/Navbar";
import CanteenItems from "./pages/CanteenItems/CanteenItems";
import CartItems from "./pages/Cart/CartItems";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import Canteens from "./pages/Canteens/Canteens";

function App() {
  const location = useLocation();

  const hideNavbarPaths = ['/login']; // Pages where navbar should not appear

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/canteens" element={<Canteens />} />
        <Route path='/canteen/:id' element={<CanteenItems/>}/>
        <Route path='/foodcart/:id' element={<CartItems/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        
      </Routes>
    </>
  );
}

export default App;
