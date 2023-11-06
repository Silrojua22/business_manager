import { useState } from "react";
import { validate } from "./validate.js";
import styles from "./Forms.module.css"; // Asegúrate de tener el módulo CSS importado

export default function UserRegistrationForm(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    const fieldErrors = validate({
      ...userData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: fieldErrors[name] || "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate(userData);

    if (Object.values(formErrors).every((error) => !error)) {
      // Si no hay errores, puedes enviar los datos
      props.registerUser(userData);
    } else {
      // Establece los errores a nivel de campo en el estado
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
            value={userData.username}
            name="username"
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
          {errors.username ? (
            <p className={styles["error-message"]}>{errors.username}</p>
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

        <div className={styles["form-field"]}>
          <input
            type="password"
            required
            value={userData.password}
            name="password"
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {errors.password ? (
            <p className={styles["error-message"]}>{errors.password}</p>
          ) : null}
        </div>

        <div className={styles["form-field"]}>
          <input
            type="password"
            required
            value={userData.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
          />
          {errors.confirmPassword ? (
            <p className={styles["error-message"]}>{errors.confirmPassword}</p>
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
