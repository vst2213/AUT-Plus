import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    // Hardcoded admin credentials
    if (username === "Admin" && password === "admin") {
      console.log("Admin logged in");
      // Navigate to the AdminPage after successful login
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleBackClick = () => {
    navigate("/login"); // Navigate back to the Login page
  };

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAdminLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      {/* Back button to navigate to the Login page */}
      <button onClick={handleBackClick} className="back-button">
        Back to User Login
      </button>
    </div>
  );
}

export default AdminLogin;
