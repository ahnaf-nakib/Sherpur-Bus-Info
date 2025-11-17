import React, { useState } from "react";

const BusCard = ({ bus }) => {
  const [showMore, setShowMore] = useState(false);
  const infoLimit = 140;

  const description = bus.description ? bus.description : "No description available.";
  const shortDesc = description.slice(0, infoLimit) + (description.length > infoLimit ? "..." : "");

  const highlightStyle = {
    fontWeight: "700",
    color: "#2563EB",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif'" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          backgroundColor: "#fff",
          flexWrap: "wrap",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
        }}
      >
        {/* Left: Bus Info */}
        <div style={{ flex: "1 1 60%", minWidth: "200px", marginBottom: "12px" }}>
          <h2 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: "900" }}>🚌 {bus.name}</h2>

          <p style={{ fontSize: "14px", margin: "4px 0" }}>
            <span style={highlightStyle}>Route:</span> {bus.route ? bus.route.join(" → ") : `${bus.from} → ${bus.to}`}
          </p>

          <p style={{ fontSize: "14px", margin: "4px 0" }}>
            <span style={highlightStyle}>Time:</span> {bus.time} | <span style={highlightStyle}>Slot:</span> {bus.slot || "N/A"}
          </p>

          <p style={{ fontSize: "14px", margin: "4px 0" }}>
            <span style={highlightStyle}>Counter:</span> {bus.counter}
          </p>

          <p style={{ fontSize: "14px", margin: "4px 0" }}>
            <span style={highlightStyle}>Fare:</span> <span style={{ color: "#EF4444", fontWeight: "900" }}>৳{bus.fare || "N/A"}</span>
          </p>

          <p style={{ fontSize: "14px", margin: "4px 0" }}>
            <span style={highlightStyle}>Contact:</span> {bus.phone}
          </p>

          <p style={{ fontSize: "14px", margin: "6px 0" }}>{showMore ? description : shortDesc}</p>
          {description.length > infoLimit && (
            <button
              onClick={() => setShowMore(!showMore)}
              style={{
                background: "none",
                border: "none",
                color: "#2563EB",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                padding: 0
              }}
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
        </div>

        {/* Right: Type Badge + Call */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          minWidth: "110px"
        }}>
          <span style={{
            padding: "8px 16px",
            borderRadius: "25px",
            backgroundColor: bus.type === "AC" ? "#2563EB" : "#6B7280",
            color: "#fff",
            fontWeight: "700",
            fontSize: "14px",
            animation: "pulse 2s infinite",
            textAlign: "center"
          }}>
            {bus.type === "AC" ? "❄️ AC" : "🔥 Non-AC"}
          </span>

          <a href={`tel:${bus.phone}`} style={{ textDecoration: "none", width: "100%" }}>
            <button style={{
              padding: "12px 14px",
              width: "100%",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#10B981",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Call Now
            </button>
          </a>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @media (max-width: 600px) {
            div[style*="flex-direction: row"] {
              flex-direction: column !important;
            }
            div[style*="align-items: flex-end"] {
              align-items: flex-start !important;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BusCard;
