import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily: "sans-serif",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
      <Link
        to="/todos"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#21a1f1")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#61dafb")}
      >
        Lihat Daftar Todo
      </Link>
    </div>
  );
};

export default HomePage;
