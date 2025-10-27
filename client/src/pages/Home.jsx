import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h1>Welcome to Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", width: "100%", marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Start</button>
      </form>
    </div>
  );
}
