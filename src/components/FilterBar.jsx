import React from "react";
import BusTypeFilter from "./BusTypeFilter";

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
      {/* AC/NON-AC Filter */}
      <BusTypeFilter
        type={filters.type || ""}
        setType={(value) => setFilters({ ...filters, type: value })}
      />

      {/* Time Filter */}
      <select
        value={filters.time || ""}
        onChange={(e) => setFilters({ ...filters, time: e.target.value })}
        style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "150px" }}
      >
        <option value="">All Time</option>
        <option value="morning">Morning (4am-12pm)</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>
    </div>
  );
};

export default FilterBar;
