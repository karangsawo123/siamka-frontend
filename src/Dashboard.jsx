function Dashboard({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Selamat datang di Dashboard SIAMKA 🎓</h1>
      <p>Halo, {user.name}</p>
    </div>
  );
}

export default Dashboard;
