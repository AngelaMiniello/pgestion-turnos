import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicesMenu from "./ServicesMenu";

function NavBar() {
  const [ user, setUser ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    };
    getUser();

    window.addEventListener("userChange", getUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img
          src="/assets/img/logo.png"
          alt="Logo"
          className={styles.logo}
        />
      </Link>

      <nav>
        <ul className={styles.nav}>
          <li><Link to="/">Inicio</Link></li>
          {user ?  (
            <>
              <li>
                <Link to="/appointments">Mis turnos</Link>
              </li>
              <li>
                <Link to="/profile">Mi perfil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
              </li>
            </> ) : ( 
            <>
              <ServicesMenu/>
            <li>
            <Link
              to="/portal"
              className="rounded-md bg-[#a80b29]  px-6 py-3 text-white font-medium shadow-sm transition"
            >
              Portal de turnos
            </Link>
            </li>
            </>)}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
