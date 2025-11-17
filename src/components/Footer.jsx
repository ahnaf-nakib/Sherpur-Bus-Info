const Footer = () => {
    return (
      <footer
        style={{
          backgroundColor: "#1F2937", // dark gray
          color: "#F3F4F6", // light text
          padding: "30px 20px",
          textAlign: "center",
          marginTop: "40px",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Sherpur Bus Info
          </h3>
  
          <p
            style={{
              margin: "5px 0",
              fontSize: "14px",
              color: "#D1D5DB",
            }}
          >
            © {new Date().getFullYear()} Sherpur Bus Info. All rights reserved.
          </p>
  
          <p
            style={{
              margin: "5px 0",
              fontSize: "14px",
              color: "#9CA3AF",
            }}
          >
            Contact: ahnaf.19cse038@gstu.edu.bd  | +8801777222370
          </p>
  
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <a
              href="https://www.facebook.com/cool.nakib/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3B82F6", textDecoration: "none" }}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1DA1F2", textDecoration: "none" }}
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F43F5E", textDecoration: "none" }}
            >
              Instagram
            </a>
          </div>
  
          {/* Developer & Data Source */}
          <div style={{ marginTop: "25px", fontSize: "13px", color: "#A5B4FC" }}>
            <p style={{ margin: "3px 0" }}>
              Developed by <strong>Ahnaf Nakib</strong>
            </p>
            <p style={{ margin: "3px 0", color: "#C7D2FE" }}>
              Bus information collected from  
              <strong> "Bus Fan Sherpur" Facebook Group</strong>
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  