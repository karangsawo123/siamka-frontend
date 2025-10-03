import React from "react";
import axios from "axios";

export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error("Logout gagal", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
