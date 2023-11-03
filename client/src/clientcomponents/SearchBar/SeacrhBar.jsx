import { useState } from "react";

function SearchBar({ onSearch }) {
  const [cuit, setCuit] = useState("");

  const handleSearch = () => {
    onSearch(cuit);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por CUIT"
        value={cuit}
        onChange={(e) => setCuit(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
