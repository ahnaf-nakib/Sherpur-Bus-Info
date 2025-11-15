// F:\Sherpur-bus\src\pages\AdminBuses.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function AdminBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const snap = await getDocs(collection(db, "buses"));
        setBuses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching buses:", err);
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  const handleUpdate = async (bus) => {
    const updatedData = {
      name: prompt("Bus Name:", bus.name) || bus.name,
      from: prompt("From:", bus.from) || bus.from,
      to: prompt("To:", bus.to) || bus.to,
      time: prompt("Time:", bus.time) || bus.time,
      counter: prompt("Counter:", bus.counter) || bus.counter,
      fare: prompt("Fare:", bus.fare) || bus.fare,
      type: prompt("Type (AC/Non-AC):", bus.type) || bus.type,
      phone: prompt("Phone:", bus.phone) || bus.phone
    };

    try {
      await updateDoc(doc(db, "buses", bus.id), updatedData);
      setBuses(prev => prev.map(b => b.id === bus.id ? { ...b, ...updatedData } : b));
      alert("✅ Bus info updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed!");
    }
  };

  const handleDelete = async (busId) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await deleteDoc(doc(db, "buses", busId));
        setBuses(prev => prev.filter(bus => bus.id !== busId));
        alert("✅ Bus deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ Delete failed!");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading buses...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">All Buses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map(bus => (
          <div key={bus.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">🚌 {bus.name}</h3>
            <p><b>From:</b> {bus.from} → <b>To:</b> {bus.to}</p>
            <p><b>Time:</b> {bus.time}</p>
            <p><b>Counter:</b> {bus.counter}</p>
            <p><b>Fare:</b> ৳{bus.fare}</p>
            <p><b>Type:</b> {bus.type}</p>
            <p><b>Phone:</b> {bus.phone}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleUpdate(bus)}
                className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(bus.id)}
                className="flex-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
