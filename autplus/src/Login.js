import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css"; // Ensure to include the updated CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      setSuccess("Login successful!");

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset the password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset link sent! Check your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Redirect to admin login
  const handleAdminLogin = () => {
    navigate("/admin-login"); // Navigate to Admin Login page
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="forgot-password">
        Forgot your password?{" "}
        <button onClick={handleForgotPassword} className="forgot-password-link">
          Reset Password
        </button>
      </p>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup" className="signup-link">Register</Link>
      </p>
      <button onClick={handleAdminLogin} className="admin-login-button">
        Admin Login
      </button>
    </div>
  );
}

export default Login;