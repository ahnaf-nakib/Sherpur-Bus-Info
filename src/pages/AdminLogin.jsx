// AdminLogin.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isAdmin } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const admin = await isAdmin(userCred.user.email);

      if (admin) {
        navigate("/admin/dashboard");
      } else {
        setError("❌ You are not an admin.");
      }
    } catch (err) {
      console.log(err);
      setError("❌ Login failed. Check your email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Login Section */}
      <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-12">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-105 duration-300 relative">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all font-semibold text-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            © {new Date().getFullYear()} Sherpur Bus Info
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-6 text-center mt-auto">
        <p>Developed with ❤️ by Sherpur Bus Info Team</p>
        <p className="text-sm mt-1">All rights reserved © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
