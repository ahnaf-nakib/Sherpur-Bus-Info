import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AutocompleteInput from "../components/AutocompleteInput"; // import the autocomplete component

export default function SubmitBus() {
  const [form, setForm] = useState({
    name: "",
    from: "Sherpur",
    to: "",
    time: "",
    counter: "",
    phone: "",
    slot: "",
    type: "",  // AC/NON-AC
    fare: "",  // ভাড়া
  });

  const submit = async () => {
    if (!form.name || !form.to || !form.time || !form.phone || !form.type || !form.fare || !form.slot) {
      alert("❌ Please fill all required fields!");
      return;
    }

    try {
      await addDoc(collection(db, "buses_request"), form);
      alert("✅ Submitted for admin approval!");
      setForm({
        name: "",
        from: "Sherpur",
        to: "",
        time: "",
        counter: "",
        phone: "",
        slot: "",
        type: "",
        fare: "",
      });
    } catch (err) {
      console.error("Error submitting bus info:", err);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563EB",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Submit Your Bus Info
      </h2>

      <input
        style={inputStyle}
        placeholder="Bus Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={inputStyle}
        placeholder="From"
        value={form.from}
        onChange={e => setForm({ ...form, from: e.target.value })}
      />

      {/* Autocomplete for "To" */}
      <AutocompleteInput
        value={form.to}
        onChange={(val) => setForm({ ...form, to: val })}
        placeholder="To (Select district)"
      />

      <input
        style={inputStyle}
        placeholder="Time (e.g., 9:00 AM)"
        value={form.time}
        onChange={e => setForm({ ...form, time: e.target.value })}
      />
      <input
        style={inputStyle}
        placeholder="Counter"
        value={form.counter}
        onChange={e => setForm({ ...form, counter: e.target.value })}
      />
      <input
        style={inputStyle}
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      {/* Slot Dropdown */}
      <select
        style={inputStyle}
        value={form.slot}
        onChange={e => setForm({ ...form, slot: e.target.value })}
      >
        <option value="">Select Slot</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>

      {/* Bus Type Dropdown */}
      <select
        style={inputStyle}
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="">Select Bus Type</option>
        <option value="AC">AC</option>
        <option value="NON-AC">NON-AC</option>
      </select>

      <input
        style={inputStyle}
        type="number"
        placeholder="Fare (৳)"
        value={form.fare}
        onChange={e => setForm({ ...form, fare: e.target.value })}
      />

      <button
        style={buttonStyle}
        onClick={submit}
        onMouseEnter={e => (e.target.style.backgroundColor = "#1E40AF")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#2563EB")}
      >
        Submit
      </button>
    </div>
  );
}
