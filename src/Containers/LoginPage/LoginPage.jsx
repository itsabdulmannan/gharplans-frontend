import { useState } from "react";
import useLogin from "./useHook";
import "./style.css";

const LoginPage = () => {
  const { loginUser } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    // Pass the login body to the hook
    await loginUser(body);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Welcome Back</h1>
          <h2 className="text-center">Please Login!</h2>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`bx ${showPassword ? "bxs-show" : "bxs-hide"}`}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
