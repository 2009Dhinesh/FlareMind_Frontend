import React, { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { auth } = useAuth(); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const { data } = await client.get("/others"); 
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading)
    return <p style={{ color: "#0ea5e9", textAlign: "center" }}>Loading users...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Current User</h2>
        {auth?.user ? (
          <div style={styles.currentUser}>
            <span style={styles.name}>
              {auth.user.firstname} {auth.user.lastname}
            </span>
            <span style={styles.email}>{auth.user.email}</span>
            <span style={styles.phone}>{auth.user.phnumber}</span>
          </div>
        ) : (
          <p style={styles.noData}>No user logged in.</p>
        )}

        <h2 style={{ ...styles.title, marginTop: "30px" }}>Other Users</h2>
        {users.length === 0 ? (
          <p style={styles.noData}>No other users found.</p>
        ) : (
          <ul style={styles.list}>
            {users.map((u) => (
              <li key={u._id} style={styles.listItem}>
                <span style={styles.name}>
                  {u.firstname} {u.lastname}
                </span>
                <span style={styles.email}>{u.email}</span>
                <span style={styles.phone}>{u.phnumber}</span>
              </li>
            ))}
          </ul>
        )}
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
    color: "#fff",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#0ea5e9",
    textAlign: "center",
  },
  noData: {
    color: "#facc15",
    textAlign: "center",
    fontWeight: "500",
  },
  currentUser: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    marginBottom: "20px",
    borderRadius: "8px",
    background: "rgba(34,197,94,0.2)",
    color: "#fff",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    marginBottom: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
  name: {
    fontWeight: "600",
    flex: 1,
  },
  email: {
    flex: 1,
    color: "#38bdf8",
  },
  phone: {
    flex: 1,
    color: "#a3e635",
    textAlign: "right",
  },
};

