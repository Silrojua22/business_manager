import UserForm from "../../clientcomponents/UsersForm/UserForm.jsx";
import AssingUser from "../../clientcomponents/AssingUser/AssingUser.jsx";
import UserList from "../../clientcomponents/UserList/userList.jsx";
import styles from "./UserForm.module.css";

function Users() {
  return (
    <div>
      <h1 className={styles.h1}>Gestor de Colaboradores</h1>
      <UserForm />
      <div className={styles.AssingUser}>
        <AssingUser />
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
}

export default Users;
