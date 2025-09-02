import { Link } from "react-router-dom";
import { useState } from "react";
import logo2 from "../../images/2.png";
import "./Navbar.css";
import { useUserAuth } from "../../context/UserAuthContext";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo2} alt="logo" />
        {user?.name && <h6>{user.name}</h6>}
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Desktop Nav */}
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/canteens">Canteens</Link></li>
          <li>{user && <Link to={`/foodcart/${user._id}`} className="cart-button">Cart</Link>}</li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
        {user ? (
          <Link className="cta-button" to="/login" onClick={logOut}>Logout</Link>
        ) : (
          <Link className="cta-button" to="/login">Login</Link>
        )}
      </nav>

      {/* Sidebar Nav for Mobile */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={closeSidebar}>&times;</span>
        <ul>
          <li><Link to="/" onClick={closeSidebar}>Home</Link></li>
          <li><Link to="/canteens" onClick={closeSidebar}>Canteens</Link></li>
          <li>{user && <Link to={`/foodcart/${user._id}`} onClick={closeSidebar}>Cart</Link>}</li>
          <li><Link to="/orders" onClick={closeSidebar}>Orders</Link></li>
          {user ? (
            <li><Link to="/login" onClick={() => { logOut(); closeSidebar(); }}>Logout</Link></li>
          ) : (
            <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
