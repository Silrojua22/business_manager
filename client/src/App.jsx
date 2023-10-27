import { useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [file1, setFile1] = useState(null);

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };

  const clearFile1 = () => {
    setFile1(null);
  };

  const compareFiles = () => {
    if (!file1) {
      alert("Por favor, selecciona un archivo Excel.");
      return;
    }

    const formData = new FormData();
    formData.append("file1", file1);

    axios
      .post("http://localhost:3001/nx_data/extractData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los archivos:", error);
      });
  };

  return (
    <div className={styles.container}>
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
      <button className={styles.button} onClick={compareFiles}>
        Crear Base de Datos
      </button>
    </div>
  );
}

export default App;
