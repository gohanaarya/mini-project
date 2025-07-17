import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = res.data;
      console.log(data.user);

      if (data.success) {
        // ✅ SAVE TOKEN TO LOCALSTORAGE
        console.log("Token before saving:", data.token);
        logIn(data.user, data.token);
        // console.log(data.message)

        navigate("/");
        // delay to show toast
        const userId = data.user._id;
        console.log(userId);
        // (Optional) Save user info too
        // localStorage.setItem("user", JSON.stringify(data.user));
        // alert("Login successful!");
        // Redirect to another page
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      toast.error("Login Failed", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
