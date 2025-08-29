import React from "react";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Cari tugas..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: 8,
        width: "100%",
        marginBottom: 20,
        borderRadius: 4,
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchInput;
