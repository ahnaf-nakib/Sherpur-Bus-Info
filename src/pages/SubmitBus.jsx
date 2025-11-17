import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AutocompleteInput from "../components/AutocompleteInput";
import busImg from "../assets/bus.png";

export default function SubmitBus() {
  const [form, setForm] = useState({
    name: "",
    from: "Sherpur",
    to: "",           // Single-select string
    time: "",
    counter: "",
    phone: "",
    slot: "",
    type: "",
    fare: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const submit = async () => {
    // Validate required fields
    if (
      !form.name ||
      !form.to ||      // check string is not empty
      !form.time ||
      !form.phone ||
      !form.type ||
      !form.fare ||
      !form.slot
    ) {
      alert("❌ Please fill all required fields!");
      return;
    }

    try {
      // Prepare data
      const dataToSubmit = { ...form }; // `to` is already a string

      await addDoc(collection(db, "buses_request"), dataToSubmit);

      // Animation
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 1200);

      alert("✅ Submitted for admin approval!");

      // Reset form
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

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Submit Your Bus Info</h2>

      <input
        placeholder="Bus Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      <input
        placeholder="From"
        value={form.from}
        onChange={e => setForm({ ...form, from: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      {/* Single-to Autocomplete */}
      <AutocompleteInput
        value={form.to}
        onChange={val => setForm({ ...form, to: val })} // val is string now
        placeholder="To (Select district)"
      />

      <input
        placeholder="Time (e.g., 9:00 AM)"
        value={form.time}
        onChange={e => setForm({ ...form, time: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      <input
        placeholder="Counter"
        value={form.counter}
        onChange={e => setForm({ ...form, counter: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      <select
        value={form.slot}
        onChange={e => setForm({ ...form, slot: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      >
        <option value="">Select Slot</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>

      <select
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      >
        <option value="">Select Bus Type</option>
        <option value="AC">AC</option>
        <option value="NON-AC">NON-AC</option>
      </select>

      <input
        type="number"
        placeholder="Fare (৳)"
        value={form.fare}
        onChange={e => setForm({ ...form, fare: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
      />

      <div style={{ position: "relative", marginTop: "25px" }}>
        <img
          src={busImg}
          alt="Bus"
          style={{
            width: "45px",
            position: "absolute",
            top: "-55px",
            left: formSubmitted ? "120%" : "-20%",
            transition: "left 1.2s ease-in-out",
            zIndex: 10,
          }}
        />
        <button
          onClick={submit}
          style={{ width: "100%", padding: "12px", backgroundColor: "#2563EB", color: "#fff", fontSize: "16px", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
