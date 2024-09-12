import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase"; // Assuming firebase is configured correctly in firebase.js
import "./Login.css"; // Import the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      setSuccess("Login successful!");
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

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Forgot your password?{" "}
        <button onClick={handleForgotPassword} className="forgot-password-link">
          Reset Password
        </button>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}

export default Login;
