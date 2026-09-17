import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";
import ServicesMenu from "./ServicesMenu";

function NavBar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      try {
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    getUser();

    window.addEventListener("userChange", getUser);

    return () => {
      window.removeEventListener("userChange", getUser);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link
          to="/"
          className={styles.logoLink}
          onClick={handleNavigation}
        >
          <img
            src="/assets/img/logo.png"
            alt="Clínica"
            className={styles.logo}
          />
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav
          ref={menuRef}
          className={`${styles.nav} ${
            isOpen ? styles.navOpen : ""
          }`}
        >
          <Link
            to="/"
            className={styles.navLink}
            onClick={handleNavigation}
          >
            Inicio
          </Link>

          {user ? (
            <>
              <Link
                to="/appointments"
                className={styles.navLink}
                onClick={handleNavigation}
              >
                Mis turnos
              </Link>

              <Link
                to="/profile"
                className={styles.navLink}
                onClick={handleNavigation}
              >
                Mi perfil
              </Link>

              <button
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <ServicesMenu
                closeMenu={() => setIsOpen(false)}
              />

              <Link
                to="/portal"
                className={styles.portalButton}
                onClick={handleNavigation}
              >
                Portal de turnos
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;