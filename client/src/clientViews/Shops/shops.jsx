import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Shops.module.css";
import SearchBar from "../../clientcomponents/SearchBar/SeacrhBar.jsx";

function Shops() {
  const [comercios, setComercios] = useState([]);
  const [filtroGestionado, setFiltroGestionado] = useState("No gestionado");
  const [filtroCodPostal, setFiltroCodPostal] = useState("Todos");

  useEffect(() => {
    async function fetchComercios() {
      try {
        const response = await axios.get(
          "http://localhost:3001/nx_data/comercios"
        );
        setComercios(response.data);
      } catch (error) {
        console.error("Error al obtener los comercios", error);
      }
    }

    fetchComercios();
  }, []);

  const handleSearchByCuit = (cuit) => {
    // Filtrar la lista de comercios según el número de CUIT ingresado
    const filteredComercios = comercios.filter((comercio) =>
      comercio.Cuit.includes(cuit)
    );
    setComercios(filteredComercios);
  };

  return (
    <div>
      <h1 className={styles.h1}>Comercios</h1>
      <SearchBar onSearch={handleSearchByCuit} />
      <div className={styles.filters}>
        <div className={styles.filter}>
          <span>Filtrar por Gestión:</span>
          <select
            value={filtroGestionado}
            onChange={(e) => setFiltroGestionado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="No gestionado">No gestionado</option>
            <option value="Gestionado">Gestionado</option>
          </select>
        </div>
        <div className={styles.filter}>
          <span>Filtrar por Código Postal:</span>
          <select
            value={filtroCodPostal.toString()}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setFiltroCodPostal(
                selectedValue === "Todos" ? "Todos" : Number(selectedValue)
              );
            }}
          >
            <option value="Todos">Todos</option>
            <option value="1706">1706</option>
            <option value="1708">1708</option>
            <option value="1712">1712</option>
            <option value="1714">1714</option>
            <option value="1718">1718</option>
            <option value="1722">1722</option>
            <option value="1742">1742</option>
            <option value="1744">1744</option>
          </select>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>Cuit</div>
          <div>N° de Comercio</div>
          <div>Nombre del Comercio</div>
          <div>Nombre del Titular</div>
          <div>C.P.</div>
          <div>Teléfono</div>
          <div>Direccón</div>
          <div>Número</div>
          <div>Nombre Legal</div>
          <div>Email</div>
          <div>Gestionado</div>
          <div>Legajo</div>
        </div>
        {comercios
          .filter(
            (comercio) =>
              (filtroGestionado === "Todos" ||
                comercio.Gestionado === filtroGestionado) &&
              (filtroCodPostal === "Todos" ||
                comercio.Cod_Postal_Legal === filtroCodPostal)
          )
          .map((comercio, index) => (
            <div key={index} className={styles.row}>
              <div>{comercio.Cuit}</div>
              <div>{comercio.Numero_de_Comercio}</div>
              <div>{comercio.Nombre_Comercio}</div>
              <div>{comercio.Nombre_Titular}</div>
              <div>{comercio.Cod_Postal_Legal}</div>
              <div>{comercio.Teléfono}</div>
              <div>{comercio.Calle_Comercio}</div>
              <div>{comercio.Número}</div>
              <div>{comercio.Nombre_Legal}</div>
              <div>{comercio.EMAIL}</div>
              <div>{comercio.Gestionado}</div>
              <div>{comercio.Legajo}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shops;
