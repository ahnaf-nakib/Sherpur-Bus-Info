// Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusCard from "../components/BusCard";
import FilterBar from "../components/FilterBar";
import AutocompleteInput from "../components/AutocompleteInput";
import NoticeBoard from "../components/NoticeBoard";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: "Sherpur", to: "", time: "", type: "" });
  const [buses, setBuses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // প্রথমে ৪টি দেখাবে

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const busCol = collection(db, "buses");
        const busSnap = await getDocs(busCol);
        setBuses(busSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuses();
  }, []);

  const filteredBuses = buses.filter(bus =>
    (!search.from || bus.from.toLowerCase().includes(search.from.toLowerCase())) &&
    (!search.to || bus.to.toLowerCase().includes(search.to.toLowerCase())) &&
    (!search.time || bus.slot === search.time) &&
    (!search.type || bus.type === search.type)
  );

  // শুধুমাত্র visibleCount অনুযায়ী card দেখাবে
  const visibleBuses = filteredBuses.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 6); // প্রতি click এ ৪টি আরও দেখাবে
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "25px",
        backgroundColor: "#2563EB",
        color: "#fff",
        padding: "25px",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
      }}>
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>Find Sherpur Bus Routes</h1>
        <p style={{ margin: "8px 0 0 0", fontSize: "17px" }}>Search buses by route, time, and type</p>
      </div>

      {/* Notice Board */}
      <NoticeBoard
        title="Important Notice"
        message="শেরপুর বাস তথ্য প্ল্যাটফর্মে আপনাকে স্বাগতম!
        এখানে শেরপুর থেকে চলাচলকারী সকল জেলার বাসের তথ্য দেওয়া হবে।
        কাজ এখনও চলমান।
        
        আপনার কোনো বাসের তথ্য আপডেট বা নতুন যুক্ত করতে চাইলে Add Bus Info পেইজে সাবমিট করুন।
        ধন্যবাদ।"
      />

      {/* Search & Filter */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "35px",
        backgroundColor: "#f1f5f9",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <AutocompleteInput
          value={search.from}
          onChange={val => setSearch({ ...search, from: val })}
          placeholder="From"
        />
        <AutocompleteInput
          value={search.to}
          onChange={val => setSearch({ ...search, to: val })}
          placeholder="To"
        />
        <FilterBar filters={search} setFilters={setSearch} />

        <button
          onClick={() => navigate(`/search?from=${search.from}&to=${search.to}&time=${search.time}&type=${search.type}`)}
          style={{
            padding: "14px",
            backgroundColor: "#10B981",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = "#059669")}
          onMouseLeave={e => (e.target.style.backgroundColor = "#10B981")}
        >
          Search Buses
        </button>
      </div>

      {/* Bus Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {visibleBuses.length ? (
          visibleBuses.map(bus => <BusCard key={bus.id} bus={bus} />)
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#6B7280", gridColumn: "1/-1" }}>
            No buses found.
          </p>
        )}
      </div>

      {/* See More Button */}
      {visibleCount < filteredBuses.length && (
        <div style={{ textAlign: "center", margin: "25px 0" }}>
          <button
            onClick={handleSeeMore}
            style={{
              padding: "12px 20px",
              backgroundColor: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = "#1E40AF")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#2563EB")}
          >
            See More
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
