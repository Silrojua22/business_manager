import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Shops.module.css";
import SearchBar from "../../clientcomponents/SearchBar/SeacrhBar.jsx";

function Shops() {
  const [comercios, setComercios] = useState([]);
  const [filtroGestionado, setFiltroGestionado] = useState("Todos");
  const [filtroCodPostal, setFiltroCodPostal] = useState("Todos");
  const [seleccionados, setSeleccionados] = useState({});
  const [busquedaCuit, setBusquedaCuit] = useState(""); // Agregar estado para la búsqueda por CUIT
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
    setBusquedaCuit(cuit); // Actualizar el estado de búsqueda por CUIT
  };

  const toggleSeleccion = (index) => {
    setSeleccionados((prevSeleccionados) => {
      const newSeleccionados = { ...prevSeleccionados };
      newSeleccionados[index] = !newSeleccionados[index];

      // Acceder a las propiedades del comercio seleccionado
      const comercioSeleccionado = comercios[index];
      const telefono = comercioSeleccionado.Teléfono;
      const email = comercioSeleccionado.EMAIL;
      const nombreTitular = comercioSeleccionado.Nombre_Titular;
      const legajo = comercioSeleccionado.Legajo;

      // Realizar acciones basadas en las propiedades del comercio
      if (newSeleccionados[index]) {
        console.log("Comercio seleccionado:");
        console.log("Teléfono:", telefono);
        console.log("Email:", email);
        console.log("Nombre del Titular:", nombreTitular);
        console.log("Legajo", legajo);

        // Realiza aquí las acciones que desees con estas propiedades

        // Realizar una solicitud para buscar el usuario por ID usando tu API
        const buscarUsuario = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/user/user_legajo/${legajo}`
            );

            const usuario = response.data;

            if (usuario) {
              // Si se encuentra el usuario, guardar Nombre y Apellido en las propiedades del comercio seleccionado
              comercioSeleccionado.NombreUsuario = usuario.Nombre;
              comercioSeleccionado.ApellidoUsuario = usuario.Apellido;

              // Imprime el nombre y apellido del usuario en la consola
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
      } else {
        // Realizar acciones cuando el comercio deja de estar seleccionado
      }

      return newSeleccionados;
    });
  };
  function createMessage(nombreTitular, nombreUsuario, apellidoUsuario) {
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
      comercio.Nombre_Titular,
      nombreUsuario,
      apellidoUsuario
    );

    const formattedPhoneNumber = comercio.Teléfono.replace(/\D/g, "");

    if (
      formattedPhoneNumber.length >= 10 &&
      formattedPhoneNumber.length <= 15
    ) {
      const whatsappURL = generateWhatsAppURL(
        comercio.Teléfono,
        mensajePredeterminado
      );

      // Intenta abrir la URL de WhatsApp en una nueva ventana o pestaña
      const whatsappWindow = window.open(whatsappURL, "_blank");

      if (whatsappWindow) {
        try {
          await axios.put(
            `http://localhost:3001/nx_data/gestion/${comercio.id}`
          );

          // Actualiza el estado del comercio a "Gestionado"
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

  // ... (código posterior)

  const filterComercios = () => {
    return comercios.filter((comercio) => {
      return (
        (filtroGestionado === "Todos" ||
          comercio.Gestionado === filtroGestionado) &&
        (filtroCodPostal === "Todos" ||
          comercio.Cod_Postal_Legal === Number(filtroCodPostal)) &&
        (busquedaCuit === "" || comercio.Cuit.includes(busquedaCuit))
      );
    });
  };

  return (
    <div>
      <h1 className={styles.h1}>Comercios</h1>
      <SearchBar onSearch={handleSearchByCuit} value={busquedaCuit} />{" "}
      {/* Pasar el valor de búsqueda por CUIT */}
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
