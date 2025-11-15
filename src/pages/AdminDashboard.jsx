import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Count pending bus requests
    const fetchPending = async () => {
      try {
        const snap = await getDocs(collection(db, "buses_request"));
        setPendingCount(snap.size);
      } catch (err) {
        console.error("Failed to fetch pending requests:", err);
      }
    };
    fetchPending();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <p className="mb-6">Welcome, Admin!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pending Requests Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">Pending Requests</h3>
          <p className="text-gray-700 mb-4">{pendingCount} requests</p>
          <Link to="/admin/pending">
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
              View Pending
            </button>
          </Link>
        </div>

        {/* Submit Bus Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">Add Bus</h3>
          <p className="text-gray-700 mb-4">Submit a new bus entry</p>
          <Link to="/submit">
            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
              Add Bus
            </button>
          </Link>
        </div>

        {/* View Buses Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">All Buses</h3>
          <p className="text-gray-700 mb-4">View and manage all buses</p>
          <Link to="/admin/buses">
            <button className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition">
              View Buses
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <Link to="/admin">
          <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
