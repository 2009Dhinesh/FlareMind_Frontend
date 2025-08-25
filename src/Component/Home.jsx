import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { auth } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>welcome to my website, {auth?.user?.firstname}</h1>
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
    background: "#1e293b", 
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)", 
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
  }
};
