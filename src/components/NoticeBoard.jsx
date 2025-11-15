const NoticeBoard = ({ title, message }) => {
    return (
      <div style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#FEF3C7", // light yellow for notice
        borderLeft: "6px solid #F59E0B", // orange stripe
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', sans-serif"
      }}>
        <h3 style={{ marginTop: 0, color: "#B45309" }}>{title}</h3>
        <p style={{ margin: "10px 0 0 0", color: "#92400E", fontSize: "16px", lineHeight: "1.6" }}>
          {message}
        </p>
      </div>
    );
  };
  
  export default NoticeBoard;
  