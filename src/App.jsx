import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import LogoutButton from "./components/LogoutButton";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ supaya ada waktu cek token dulu

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Token invalid");
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token"); // kalau token expired/hilang
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <img src="/hogwarts.png" alt="Loading..." width="80" />
      <p>hogwarts university of dumbledore...</p>
    </div>
  );
}

  return (
    <Router>
      <Routes>
        {/* halaman login */}
        <Route
          path="/"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
        />

        {/* halaman dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <div>
                <Dashboard user={user} />
                <LogoutButton setUser={setUser} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
