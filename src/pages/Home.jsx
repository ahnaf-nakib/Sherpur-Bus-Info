import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BusCard from "../components/BusCard";
import FilterBar from "../components/FilterBar";
import AutocompleteInput from "../components/AutocompleteInput";
import NoticeBoard from "../components/NoticeBoard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import bgImage from "../assets/Gemini_Generated_Image_u2c4w8u2c4w8u2c4.png";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    from: "Sherpur",
    to: "",
    time: "",
    type: ""
  });

  const [buses, setBuses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

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

  // Route-aware filtering
  const filteredBuses = buses.filter(bus => {
    const busRoute = bus.route || [bus.from, bus.to]; // fallback if no route array
    const fromMatch = !search.from || busRoute.includes(search.from);
    const toMatch = !search.to || busRoute.includes(search.to);
    const timeMatch = !search.time || bus.slot === search.time;
    const typeMatch = !search.type || bus.type === search.type;

    return fromMatch && toMatch && timeMatch && typeMatch;
  });

  const visibleBuses = filteredBuses.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <div
        style={{
          padding: "25px 20px",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px"
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rgba(37, 99, 235, 0.85)",
            color: "#fff",
            padding: "15px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            maxWidth: "750px",
            width: "100%"
          }}
        >
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold" }}>
            Find Sherpur Bus Routes
          </h1>
          <p style={{ margin: "6px 0 0 0", fontSize: "14px" }}>
            Search buses by route, time, and type
          </p>
        </div>

        {/* Notice Board */}
        <NoticeBoard
          title="Important Notice"
          message={`শেরপুর বাস তথ্য প্ল্যাটফর্মে আপনাকে স্বাগতম!
এখানে শেরপুর থেকে চলাচলকারী সকল জেলার বাসের তথ্য দেওয়া হবে।
কাজ এখনও চলমান।

আপনার কোনো বাসের তথ্য আপডেট বা নতুন যুক্ত করতে চাইলে Add Bus Info পেইজে সাবমিট করুন।
ধন্যবাদ।`}
          style={{ maxWidth: "750px", width: "100%" }}
        />

        {/* Search Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "14px",
            borderRadius: "12px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
            maxWidth: "750px",
            width: "100%"
          }}
        >
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
            onClick={() =>
              navigate(
                `/search?from=${search.from}&to=${search.to}&time=${search.time}&type=${search.type}`
              )
            }
            style={{
              padding: "10px",
              backgroundColor: "#10B981",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              alignSelf: "center",
              maxWidth: "170px",
              width: "100%"
            }}
          >
            Search Buses
          </button>
        </div>
      </div>

      {/* Bus Cards Section */}
      <div
        style={{
          padding: "20px 15px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {visibleBuses.length ? (
            visibleBuses.map(bus => <BusCard key={bus.id} bus={bus} />)
          ) : (
            <p style={{ textAlign: "center", fontSize: "16px", color: "#6B7280" }}>
              No buses found.
            </p>
          )}
        </div>

        {visibleCount < filteredBuses.length && (
          <div style={{ textAlign: "center", margin: "15px 0" }}>
            <button
              onClick={handleSeeMore}
              style={{
                padding: "10px 18px",
                backgroundColor: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
