import React, { useState } from "react";
import client from "../api/client"; // Make sure baseURL points to http://localhost:8080/user
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
      // Call backend signup route
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

  return (
    <div style={{ padding: 24 }}>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input
          name="firstname"
          placeholder="First name"
          value={form.firstname}
          onChange={onChange}
          required
        />
        <input
          name="lastname"
          placeholder="Last name"
          value={form.lastname}
          onChange={onChange}
          required
        />
        <input
          name="phnumber"
          placeholder="Phone"
          value={form.phnumber}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8)"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
