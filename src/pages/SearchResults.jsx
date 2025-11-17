import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusCard from "../components/BusCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);

  const from = searchParams.get("from") || "";
  const toParam = searchParams.get("to") || "";
  const time = searchParams.get("time") || "";
  const type = searchParams.get("type") || "";

  // Handle multiple "to" districts
  const toList = toParam ? toParam.split(",").map(t => t.trim()) : [];

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const busCol = collection(db, "buses");
        const snap = await getDocs(busCol);

        let fetched = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Route-aware & multi-to filtering
        fetched = fetched.filter(bus => {
          const busRoute = bus.route || [bus.from, bus.to]; // fallback if route missing
          const fromMatch = !from || busRoute.includes(from);
          const toMatch =
            toList.length === 0 ||
            toList.some(toDistrict => busRoute.includes(toDistrict));
          const timeMatch = !time || bus.slot === time;
          const typeMatch = !type || bus.type === type;

          return fromMatch && toMatch && timeMatch && typeMatch;
        });

        setBuses(fetched);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
  }, [from, toParam, time, type]); // update effect if params change

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Search Results
      </h2>

      {buses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {buses.map(bus => (
            <BusCard key={bus.id} bus={bus} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No buses found for your search.
        </p>
      )}
    </div>
  );
}
