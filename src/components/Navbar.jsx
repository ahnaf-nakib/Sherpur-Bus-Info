import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Gemini_Generated_Image_h3ungjh3ungjh3un.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Add Bus Info", path: "/submit" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#2563EB",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo + Title */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: "white",
        }}
      >
        <img
          src={logo}
          alt="Sherpur Bus Logo"
          style={{ width: "40px", height: "40px", borderRadius: "5px" }}
        />
        <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
          Sherpur Bus Info
        </h2>
      </Link>

      {/* Hamburger for mobile */}
      {isMobile && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: "flex", flexDirection: "column", cursor: "pointer", gap: "5px" }}
        >
          <span
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "white",
              borderRadius: "2px",
            }}
          ></span>
          <span
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "white",
              borderRadius: "2px",
            }}
          ></span>
          <span
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "white",
              borderRadius: "2px",
            }}
          ></span>
        </div>
      )}

      {/* Menu Links */}
      {(isOpen || !isMobile) && (
        <ul
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: isMobile ? "absolute" : "static",
            top: isMobile ? "60px" : "auto",
            right: isMobile ? "20px" : "auto",
            backgroundColor: isMobile ? "#2563EB" : "transparent",
            borderRadius: isMobile ? "5px" : "0",
            boxShadow: isMobile ? "0 2px 5px rgba(0,0,0,0.3)" : "none",
          }}
        >
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  transition: "all 0.2s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#1E40AF")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                onClick={() => isMobile && setIsOpen(false)} // close menu on click
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
