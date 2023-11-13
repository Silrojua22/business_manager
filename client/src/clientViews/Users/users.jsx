import UserForm from "../../clientcomponents/UsersForm/UserForm.jsx";
import AssingUser from "../../clientcomponents/AssingUser/AssingUser.jsx";
import styles from "./UserForm.module.css";

function Users() {
  return (
    <div>
      <h1 className={styles.h1}>Gestor de Colaboradores</h1>
      <UserForm />
      <AssingUser />
    </div>
  );
}

export default Users;
