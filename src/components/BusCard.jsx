import React, { useState } from "react"; 

const BusCard = ({ bus }) => {
  const [showMore, setShowMore] = useState(false);
  const infoLimit = 120;

  const description = bus.description ? bus.description : "No description available.";
  const shortDesc = description.slice(0, infoLimit) + (description.length > infoLimit ? "..." : "");

  const highlightStyle = {
    fontWeight: "900", // extra bold
    color: "#2563EB",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Bus Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "15px",
          marginBottom: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          flexWrap: "wrap",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        {/* Left: Bus Info */}
        <div style={{ flex: "1 1 60%", minWidth: "180px", marginBottom: "10px" }}>
          <h2 style={{ margin: "0 0 5px 0", fontSize: "18px", fontWeight: "900" }}>🚌 {bus.name}</h2>

          <p style={{ fontSize: "13px" }}>
            <span style={highlightStyle}>From:</span> {bus.from} → <span style={highlightStyle}>To:</span> {bus.to}
          </p>

          <p style={{ fontSize: "13px" }}>
            <span style={highlightStyle}>Time:</span> {bus.time} | <span style={highlightStyle}>Slot:</span> {bus.slot || "N/A"}
          </p>

          <p style={{ fontSize: "13px" }}>
            <span style={highlightStyle}>Counter:</span> {bus.counter}
          </p>

          <p style={{ fontSize: "13px" }}>
            <span style={highlightStyle}>Fare:</span> <span style={{ color: "#EF4444", fontWeight: "900", fontFamily: "'Poppins', sans-serif" }}>৳{bus.fare || "N/A"}</span>
          </p>

          <p style={{ fontSize: "13px" }}>
            <span style={highlightStyle}>Contact:</span> {bus.phone}
          </p>

          <p style={{ fontSize: "13px" }}>{showMore ? description : shortDesc}</p>
          {description.length > infoLimit && (
            <button
              onClick={() => setShowMore(!showMore)}
              style={{
                background: "none",
                border: "none",
                color: "#2563EB",
                cursor: "pointer",
                fontSize: "13px",
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
          gap: "8px",
          minWidth: "100px"
        }}>
          <span style={{
            padding: "6px 12px",
            borderRadius: "20px",
            backgroundColor: bus.type === "AC" ? "#2563EB" : "#6B7280",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "13px",
            animation: "pulse 2s infinite",
            textAlign: "center"
          }}>
            {bus.type === "AC" ? "❄️ AC" : "🔥 Non-AC"}
          </span>

          <a href={`tel:${bus.phone}`} style={{ textDecoration: "none", width: "100%" }}>
            <button style={{
              padding: "10px 12px",
              width: "100%",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#10B981",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px"
            }}>
              Call Now
            </button>
          </a>
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @media (max-width: 600px) {
            div[style*="flex-direction: row"] {
              flex-direction: column;
            }
            div[style*="align-items: flex-end"] {
              align-items: flex-start;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BusCard;
