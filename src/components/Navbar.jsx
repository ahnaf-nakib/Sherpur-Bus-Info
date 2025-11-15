import React from "react";
import { Link } from "react-router-dom";
// ✅ Import the logo from assets
import logo from "../assets/Gemini_Generated_Image_toizsjtoizsjtoiz.png";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#2563EB",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Logo */}
        <img
          src={logo}
          alt="Sherpur Bus Logo"
          style={{ width: "40px", height: "40px", borderRadius: "5px" }}
        />
        {/* Title */}
        <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
          Sherpur Bus Info
        </h2>
      </div>

      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0 }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
     