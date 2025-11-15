// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SubmitBus from "./pages/SubmitBus";
import AdminLogin from "./pages/AdminLogin";
import AdminPending from "./pages/AdminPending";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBuses from "./pages/AdminBuses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ import Footer

export default function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname.startsWith("/admin"); // hide for admin routes

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/submit" element={<SubmitBus />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/pending" element={<AdminPending />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/buses" element={<AdminBuses />} />
      </Routes>
      {!hideNavbarFooter && <Footer />} {/* ✅ Footer add */}
    </>
  );
}
