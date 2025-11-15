import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusCard from "../components/BusCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const time = searchParams.get("time") || "";

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const busCol = collection(db, "buses");
        let q = query(
          busCol,
          where("from", "==", from),
          where("to", "==", to)
        );

        const snap = await getDocs(q);
        let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Optional time filtering
        if (time) {
          fetched = fetched.filter(bus => bus.time === time);
        }

        setBuses(fetched);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    if (from && to) fetchBuses();
  }, [from, to, time]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Search Results</h2>
      {buses.length > 0 ? (
        buses.map(bus => <BusCard key={bus.id} bus={bus} />)
      ) : (
        <p>No buses found for your search.</p>
      )}
    </div>
  );
}
