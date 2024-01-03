import UserForm from "../../clientcomponents/UsersForm/UserForm.jsx";
import AssingUser from "../../clientcomponents/AssingUser/AssingUser.jsx";
import axios from "axios";
import styles from "./UserForm.module.css";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  console.log("El usuario =>", users);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3001/user/all_users"
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los ususarios", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className={styles.h1}>Gestor de Colaboradores</h1>
      <UserForm />
      <div className={styles.AssingUser}>
        <AssingUser />
      </div>
      <div>
        <h2>Lista de usuarios</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h2>Nombre: {user.Nombre}</h2>
              <p>Legajo: {user.Legajo}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
