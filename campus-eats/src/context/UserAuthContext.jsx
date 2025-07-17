import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create context
const userAuthContext = createContext();

// Context Provider component
export function UserAuthContextProvider(props) {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("token"));

  function logIn(user, token) {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    toast.success("User Login Successfull");

  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setToken(null);
    setUser(null);
    toast.success("Logged out")
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data && data.user && data.success) {
            setUser(data.user);
            setToken(token);
          } else {
            setUser(null);
            setToken(null);
          }
        })
        .catch((err) => {
          console.error("Token validation error:", err.response?.data || err.message);
        });
    }
  }, []);

  return (
    <userAuthContext.Provider value={{ user, token, logIn, logOut }}>
      {props.children}
    </userAuthContext.Provider>
  );
}

// Hook to use the auth context
export function useUserAuth() {
  return useContext(userAuthContext);
}
