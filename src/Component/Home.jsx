import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function Home() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await client.post("/logout"); // ✅ Correct path
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {auth?.user?.firstname}</h1>
        <nav style={styles.nav}>
          <Link to="/users" style={styles.link}>
            User Module
          </Link>
          <button onClick={onLogout} style={styles.button}>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#1e293b", // dark blue-gray
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)", // glass effect
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
  },
  link: {
    padding: "10px 16px",
    borderRadius: "8px",
    background: "#0ea5e9", // cyan-blue
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none",
    transition: "0.3s",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444", // red
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};
