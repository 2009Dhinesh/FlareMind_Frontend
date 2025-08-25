import React, { useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/signin", form);

      if (data.message === "Login successful") {
        login({ user: data.user, token: data.token });
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={onSubmit} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.text}>
          No account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#1e293b", // dark blue-gray
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)", // glass effect
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#fff", // white text
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    borderBottom: "3px solid #fff",
    background: "transparent",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#0ea5e9", // cyan-blue
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#fff",
  },
  link: {
    color: "#0ea5e9",
    textDecoration: "none",
    fontWeight: "600",
  },
};
