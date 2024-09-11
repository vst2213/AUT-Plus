import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase sign-in method
import { auth } from "./firebase"; // Import the Firebase auth instance

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const [success, setSuccess] = useState(""); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    try {
      // Use Firebase's signInWithEmailAndPassword method
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      setSuccess("Login successful!");
    } catch (error) {
      setError(error.message); // Display error message if login fails
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      {success && <p style={{ color: "green" }}>{success}</p>}{" "}
      {/* Show success message */}
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
    </div>
  );
}

export default Login;
