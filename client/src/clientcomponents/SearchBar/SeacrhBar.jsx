import { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState(props.value || "");
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");

    setSearchTerm(value);
    props.onSearch(numericValue);

    // Mostrar una advertencia si se ingresan caracteres no numéricos
    setShowWarning(numericValue !== value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por CUIT"
        value={searchTerm}
        onChange={handleChange}
      />
      {showWarning && (
        <span style={{ color: "red" }}>
          Por favor, ingrese solo el número de cuit.
        </span>
      )}
    </div>
  );
}

export default SearchBar;
