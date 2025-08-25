import React, { useState } from "react";
import client from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phnumber: "",
    email: "",
    password: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/signup", form);

      if (data.message === "Register Successfully...") {
        alert("Signup successful. Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1e293b",
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      padding: "30px",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#fff",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "26px",
      fontWeight: "600",
      color: "#fff",
    },
    input: {
      width: "100%",
      padding: "10px 15px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.05)",
      color: "#fff",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#3b82f6", // blue accent
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    footerText: {
      textAlign: "center",
      marginTop: "15px",
      color: "#ccc",
    },
    link: {
      color: "#3b82f6",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Signup</h2>
        <form onSubmit={onSubmit}>
          <input
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={onChange}
            style={styles.input}
            required
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={onChange}
            style={styles.input}
            required
          />
          <input
            name="phnumber"
            placeholder="Phone Number"
            value={form.phnumber}
            onChange={onChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 8)"
            value={form.password}
            onChange={onChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>
        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
