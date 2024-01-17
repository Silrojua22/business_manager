import { useEffect, useState } from "react";
import axios from "axios";
import style from "./userList.module.css";
export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3001/user/all_users"
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className={style.userListTitle}>Lista de colaboradores</h1>
      <div className={style.tableContainer}>
        <div className={style.tableHeader}>
          <div>Nombre y Apellido</div>
          <div>Legajo</div>
        </div>
        {users.map((user) => (
          <div className={style.row} key={user.id}>
            <div>
              {user.Nombre} {user.Apellido}
            </div>
            <div>{user.Legajo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
