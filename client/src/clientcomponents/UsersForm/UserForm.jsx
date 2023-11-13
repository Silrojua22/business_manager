import { useState } from "react";
import { validate } from "./validate.js";
import axios from "axios";
import styles from "./Forms.module.css";

export default function UserFomr(props) {
  const [userData, setUserData] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    const fieldErrors = validate({
      ...userData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: fieldErrors[name] || "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(userData);

    if (Object.values(formErrors).every((error) => !error)) {
      console.log("Datos a enviar:", userData);

      try {
        const response = await axios.post(
          "http://localhost:3001/user/user-create",
          userData
        );

        if (response.status === 201) {
          alert("Usuario registrado exitosamente");
        } else {
          if (response.data && response.data.error) {
            if (response.data.error.includes("unique constraint")) {
              alert("El usuario ya ha sido creado");
            } else {
              console.error("Error al registrar usuario:", response.data.error);
            }
          } else {
            console.error("Error desconocido al registrar usuario");
          }
        }
      } catch (error) {
        console.error("Error al comunicarse con el servidor", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <div className={styles["form-field"]}>
          <input
            type="text"
            required
            value={userData.legajo}
            name="legajo"
            onChange={handleChange}
            placeholder="Número de Legajo"
          />
          {errors.legajo ? (
            <p className={styles["error-message"]}>{errors.legajo}</p>
          ) : null}
        </div>

        <div className={styles["form-field"]}>
          <input
            type="text"
            required
            value={userData.nombre}
            name="nombre"
            onChange={handleChange}
            placeholder="Nombre"
          />
          {errors.nombre ? (
            <p className={styles["error-message"]}>{errors.nombre}</p>
          ) : null}
        </div>

        <div className={styles["form-field"]}>
          <input
            type="text"
            required
            value={userData.apellido}
            name="apellido"
            onChange={handleChange}
            placeholder="Apellido"
          />
          {errors.apellido ? (
            <p className={styles["error-message"]}>{errors.apellido}</p>
          ) : null}
        </div>

        <div className={styles["form-field"]}>
          <input
            type="email"
            required
            value={userData.email}
            name="email"
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          {errors.email ? (
            <p className={styles["error-message"]}>{errors.email}</p>
          ) : null}
        </div>

        <br />
        <button type="submit" className={styles["submit-button"]}>
          Registrarse
        </button>
      </form>
    </div>
  );
}
