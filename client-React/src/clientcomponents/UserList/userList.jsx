import { useEffect, useState } from "react";
import axios from "axios";

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
        console.error("Error al obtener los ususarios", error);
      }
    }

    fetchUsers();
  }, []);

  return (
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
  );
}
