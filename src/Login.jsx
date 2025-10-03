import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // pastikan sudah ada

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // untuk pindah halaman

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);

        // simpan data user ke state App.jsx
        setUser(data.user);

        // pindah ke dashboard
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login gagal");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* logo harus ada di public/hogwarts.png */}
        <img src="/hogwarts.png" alt="Logo Kampus" className="login-logo" />
        <h2 className="login-title">Sistem Aset Manajemen Kampus</h2>
        <p className="login-subtitle">Silakan login untuk melanjutkan</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}

        <p className="login-footer">© 2025 University Hogwarts – SIAMKA</p>
      </div>
    </div>
  );
}

export default Login;
