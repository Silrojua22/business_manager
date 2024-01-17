import UserForm from "../../clientcomponents/UsersForm/UserForm.jsx";
import AssingUser from "../../clientcomponents/AssingUser/AssingUser.jsx";
import styles from "./UserForm.module.css";
import UserList from "../../clientcomponents/UserList/userList.jsx";

function Users() {
  return (
    <div>
      <h1 className={styles.h1}>Gestor de Colaboradores</h1>
      <UserForm />
      <div className={styles.AssingUser}>
        <AssingUser />
      </div>
      <hr />
      <div className={styles.userListContainer}>
        <UserList />
      </div>
    </div>
  );
}

export default Users;
