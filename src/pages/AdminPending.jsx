import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminPending() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const snap = await getDocs(collection(db, "buses_request"));
        setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const approveRequest = async (bus) => {
    try {
      await addDoc(collection(db, "buses"), bus);
      await deleteDoc(doc(db, "buses_request", bus.id));
      setRequests(prev => prev.filter(r => r.id !== bus.id));
      alert("✅ Bus approved successfully!");
    } catch (err) {
      console.error("Approval failed:", err);
      alert("❌ Failed to approve. Try again.");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading pending requests...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Pending Bus Submissions</h2>

      {requests.length === 0 && <p style={{ textAlign: "center" }}>No pending requests.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {requests.map(bus => (
          <div
            key={bus.id}
            style={{
              padding: "15px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div>
              <h3 style={{ marginBottom: "8px", fontSize: "18px", color: "#1E3A8A" }}>{bus.name}</h3>
              <p style={{ margin: "4px 0" }}><b>From:</b> {bus.from} → <b>To:</b> {bus.to}</p>
              <p style={{ margin: "4px 0" }}><b>Time:</b> {bus.time} | <b>Slot:</b> {bus.slot || "Any"}</p>
              {bus.counter && <p style={{ margin: "4px 0" }}><b>Counter:</b> {bus.counter}</p>}
              <p style={{ margin: "4px 0" }}><b>Phone:</b> {bus.phone}</p>
            </div>
            <button
              onClick={() => approveRequest(bus)}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s"
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = "#1E40AF")}
              onMouseLeave={e => (e.target.style.backgroundColor = "#2563EB")}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
