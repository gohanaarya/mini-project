import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa"; // Icon for demo login button

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mini-project-n8cx.onrender.com/api/auth/login", {
        email,
        password,
      });

      const data = res.data;
      console.log(data.user);

      if (data.success) {
        logIn(data.user, data.token);
        navigate("/");
        const userId = data.user._id;
        console.log(userId);
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      toast.error("Login Failed");
      console.log(err)
    }
  };

  // 🟢 DEMO LOGIN HANDLER
  const handleDemoLogin = () => {
    const demoEmail = "gattuvamshi.set2022@dsuniversity.ac.in";
    const demoDOB = "2003-05-17"; // assuming password is DOB

    setEmail(demoEmail);
    setPassword(demoDOB);

    // mimic form submission
    setTimeout(() => {
      document.querySelector("form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }, 100); // delay so states are updated before form submission
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
          <label>Date of Birth</label>
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

        {/* 🟢 DEMO LOGIN BUTTON */}
        <button
          type="button"
          className="login-button demo-login-button"
          onClick={handleDemoLogin}
        >
          <FaUserCircle style={{ marginRight: "8px" }} />
          Login with Demo Account
        </button>
      </form>
    </div>
  );
};

export default Login;
