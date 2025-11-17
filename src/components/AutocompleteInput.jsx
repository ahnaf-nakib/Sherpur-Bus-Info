import { useState } from "react";
import { districts } from "../data/districts";

const AutocompleteInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value;
    setInputValue(input);

    if (input.length > 0) {
      const filtered = districts.filter(d =>
        d.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (district) => {
    onChange(district);   // <-- single selection
    setInputValue(district);
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          boxSizing: "border-box"
        }}
      />

      {suggestions.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxHeight: "150px",
          overflowY: "auto",
          zIndex: 10,
          margin: 0,
          padding: 0,
          listStyle: "none"
        }}>
          {suggestions.map((d, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(d)}
              style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}
            >
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
