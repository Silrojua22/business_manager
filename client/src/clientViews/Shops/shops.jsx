import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Shops.module.css";
import SearchBar from "../../clientcomponents/SearchBar/SeacrhBar.jsx";

function Shops() {
  const [comercios, setComercios] = useState([]);
  const [filtroGestionado, setFiltroGestionado] = useState("Todos");
  const [filtroCodPostal, setFiltroCodPostal] = useState("Todos");
  const [seleccionados, setSeleccionados] = useState({});
  const [busquedaCuit, setBusquedaCuit] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");

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
    setBusquedaCuit(cuit);
  };

  const toggleSeleccion = (index) => {
    setSeleccionados((prevSeleccionados) => {
      const newSeleccionados = { ...prevSeleccionados };
      newSeleccionados[index] = !newSeleccionados[index];

      const comercioSeleccionado = comercios[index];
      const telefono = comercioSeleccionado.Teléfono;
      const email = comercioSeleccionado.EMAIL;
      const nombreTitular = comercioSeleccionado.Nombre_Legal;
      const legajo = comercioSeleccionado.Legajo;

      if (newSeleccionados[index]) {
        console.log("Comercio seleccionado:");
        console.log("Teléfono:", telefono);
        console.log("Email:", email);
        console.log("Nombre del Titular:", nombreTitular);
        console.log("Legajo", legajo);

        const buscarUsuario = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/user/user_legajo/${legajo}`
            );

            const usuario = response.data;

            if (usuario) {
              setNombreUsuario(usuario.Nombre);
              setApellidoUsuario(usuario.Apellido);

              console.log("Nombre del Usuario:", usuario.Nombre);
              console.log("Apellido del Usuario:", usuario.Apellido);
            } else {
              setNombreUsuario("");
              setApellidoUsuario("");
            }
          } catch (error) {
            console.error("Error al buscar usuario por ID:", error);
          }
        };

        buscarUsuario();
      }
      return newSeleccionados;
    });
  };

  function createMessage(nombreTitular) {
    const mensaje = `Hola ${nombreTitular}, 
      te informamos que ${nombreUsuario} ${apellidoUsuario} ha realizado una acción en nuestra plataforma.`;
    console.log("Mensaje predeterminado:", mensaje);
    return mensaje;
  }

  function generateWhatsAppURL(phoneNumber, message) {
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;
    return whatsappURL;
  }

  const sendMessageToComercio = async (comercio) => {
    const mensajePredeterminado = createMessage(
      comercio.Nombre_Legal,
      nombreUsuario,
      apellidoUsuario
    );

    const formattedPhoneNumber = comercio.Teléfono.replace(/\D/g, "");

    const phoneNumberRegex = /^[0-9]{10,15}$/;

    if (phoneNumberRegex.test(formattedPhoneNumber)) {
      const whatsappURL = generateWhatsAppURL(
        comercio.Teléfono,
        mensajePredeterminado
      );

      const whatsappWindow = window.open(whatsappURL, "_blank");

      if (whatsappWindow) {
        try {
          await axios.put(
            `http://localhost:3001/nx_data/gestion/${comercio.id}`
          );

          await updateComercioEstado(comercio.id, "Gestionado");
          alert("El estado se ha modificado a Gestionado con éxito.");
        } catch (error) {
          console.error("Error al cambiar el estado del comercio:", error);
          alert("Error al cambiar el estado del comercio.");
        }
      } else {
        alert("No se pudo abrir la URL de WhatsApp.");
      }
    } else {
      // Mostrar alerta solo si el número de teléfono es incorrecto
      alert("El número de teléfono es incorrecto.");
    }
  };

  function updateComercioEstado(comercioId, nuevoEstado) {
    setComercios((prevComercios) => {
      return prevComercios.map((comercio) => {
        if (comercio.id === comercioId) {
          return {
            ...comercio,
            Gestionado: nuevoEstado,
          };
        }
        return comercio;
      });
    });
  }

  const filterComercios = () => {
    return comercios.filter((comercio) => {
      return (
        (filtroGestionado === "Todos" ||
          comercio.Gestionado === filtroGestionado) &&
        (filtroCodPostal === "Todos" ||
          comercio.Cod_Postal_Legal.toString() === filtroCodPostal) &&
        (busquedaCuit === "" || comercio.Cuit.includes(busquedaCuit))
      );
    });
  };

  return (
    <div>
      <h1 className={styles.h1}>Comercios</h1>
      <SearchBar onSearch={handleSearchByCuit} value={busquedaCuit} />{" "}
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
            value={filtroCodPostal}
            onChange={(e) => setFiltroCodPostal(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="1716">1716</option>
            <option value="1718">1718</option>
            <option value="1722">1722</option>
            <option value="1723">1723</option>
            <option value="1727">1727</option>
            <option value="1742">1742</option>
            <option value="1744">1744</option>
            <option value="1746">1746</option>
            <option value="1748">1748</option>
            <option value="1761">1761</option>
            <option value="6700">6700</option>
            <option value="1664">1664</option>
            <option value="1721">1721</option>
            <option value="1749">1749</option>
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
          <div>Promoción</div>
          <div>Gestionado</div>
          <div>Legajo</div>
        </div>
        {filterComercios().map((comercio, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={seleccionados[index] || false}
                onChange={() => toggleSeleccion(index)}
              />

              {seleccionados[index] ? (
                <button onClick={() => sendMessageToComercio(comercio)}>
                  Enviar
                </button>
              ) : (
                <div>{comercio.Cuit}</div>
              )}
            </div>
            <div>{comercio.Numero_de_Comercio}</div>
            <div>{comercio.Nombre_Comercio}</div>
            <div>{comercio.Nombre_Titular}</div>
            <div>{comercio.Cod_Postal_Legal}</div>
            <div>{comercio.Teléfono}</div>
            <div>{comercio.Calle_Comercio}</div>
            <div>{comercio.Número}</div>
            <div>{comercio.Nombre_Legal}</div>
            <div>{comercio.EMAIL}</div>
            <div>{comercio.Promoción}</div>
            <div>{comercio.Gestionado}</div>
            <div>{comercio.Legajo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shops;
