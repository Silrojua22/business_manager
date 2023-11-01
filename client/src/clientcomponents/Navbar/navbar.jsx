import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar}>
        <li>
          <NavLink to="/" className={styles.navLink}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuarios" className={styles.navLink}>
            Gestor de Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink to="/amba" className={styles.navLink}>
            Comercios Amba
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
