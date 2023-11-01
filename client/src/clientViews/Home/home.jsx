import { useState, useEffect } from "react";
import styles from "./home.module.css";
import axios from "axios";

function Home() {
  const [file1, setFile1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };

  const clearFile1 = () => {
    setFile1(null);
  };

  const createDatabase = () => {
    if (!file1) {
      setAlertMessage("Por favor, selecciona un archivo Excel.");
      return;
    }

    setLoading(true); // Mostrar indicador de carga

    const formData = new FormData();
    formData.append("file1", file1);

    axios
      .post("http://localhost:3001/nx_data/extractData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Base de datos creada correctamente
        console.log(response.data);
        setAlertMessage("Base de datos creada correctamente.");
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al cargar los archivos:", error);
        setAlertMessage("Error al crear la base de datos.");
      })
      .finally(() => {
        setLoading(false); // Ocultar indicador de carga
      });
  };

  useEffect(() => {
    // Limpiar el mensaje de alerta después de 5 segundos
    const timeout = setTimeout(() => {
      setAlertMessage("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alertMessage]);

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <h1>Gestor de comercios</h1>
        <div className={styles.input}>
          <div>
            <input type="file" onChange={handleFile1Change} accept=".xlsx" />
            {file1 && (
              <button className={styles.clearButton} onClick={clearFile1}>
                Quitar
              </button>
            )}
          </div>
        </div>
        <button className={styles.button} onClick={createDatabase}>
          Crear Base de Datos
        </button>

        {loading && <div className={styles.loading}>Cargando...</div>}

        {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
      </div>
    </div>
  );
}

export default Home;
