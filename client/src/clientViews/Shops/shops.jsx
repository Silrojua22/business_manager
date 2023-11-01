import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Shops.module.css";

function Shops() {
  const [comercios, setComercios] = useState([]);
  const [filtroGestionado, setFiltroGestionado] = useState("No gestionado");

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

  return (
    <div>
      <h1 className={styles.h1}>Comercios</h1>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>Cuit</div>
          <div>Número de Comercio</div>
          <div>Nombre del Comercio</div>
          <div>Nombre del Titular</div>
          <div>Código Postal Legal</div>
          <div>Teléfono</div>
          <div>Calle del Comercio</div>
          <div>Número</div>
          <div>Nombre Legal</div>
          <div>Email</div>
          <div>Gestionado</div>
          <div>Colaborador</div>
        </div>
        <div className={styles.row}>
          <div>
            <select
              value={filtroGestionado}
              onChange={(e) => setFiltroGestionado(e.target.value)}
            >
              <option value="No gestionado">No gestionado</option>
              <option value="Gestionado">Gestionado</option>
            </select>
          </div>
        </div>
        {comercios
          .filter((comercio) =>
            filtroGestionado === "Todos"
              ? true
              : comercio.Gestionado === filtroGestionado
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
              <div>{comercio.UserId}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shops;
