import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServicesMenu from "./ServicesMenu";

function NavBar() {
  const [ user, setUser ] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
  
  useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img
          src="/assets/img/logo.png"
          alt="Logo"
          className={styles.logo}
        />
      </Link>

      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <nav>
        <ul ref={menuRef}
          className={`${styles.nav} ${
    isOpen ? styles.navOpen : styles.navClosed
  }`}
>
          <li className="cursor-pointer text-[17px] text-gray-50 hover:text-[#f891cb] font-sans"><Link to="/">Inicio</Link></li>
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
              className="
  block w-full text-center
  rounded-md bg-[#a80b29] 
  px-4 py-2 text-sm
  md:px-6 md:py-3 md:text-base
  text-white font-medium shadow-sm transition
"
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
