import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import logo2 from "../../images/2.png";
import "./Navbar.css";
import { useUserAuth } from "../../context/UserAuthContext";

const Navbar = () => {
  const { user, logOut } = useUserAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo2} alt="logo" />
        {user?.name && <h6>{user.name}</h6>}
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/canteens">Canteens</Link>
          </li>
          <li>
            {user && (
              <Link to={`/foodcart/${user._id}`} className="cart-button">
                🛒 Cart
              </Link>
            )}
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
        {user ? (
          <Link className="cta-button" to={"/login"} onClick={logOut}>
            Logout
          </Link>
        ) : (
          <Link className="cta-button" to={"/login"}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
