import React from "react";

const BusTypeFilter = ({ type, setType }) => {
  return (
    <select
      value={type}
      onChange={e => setType(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        minWidth: "120px"
      }}
    >
      <option value="">All Types</option>
      <option value="AC">AC</option>
      <option value="NON-AC">NON-AC</option>
    </select>
  );
};

export default BusTypeFilter;
