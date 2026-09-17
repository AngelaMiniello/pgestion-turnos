import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { ChevronDown } from "lucide-react"; 
import styles from "./ServicesMenu.module.css";

interface ServicesMenuProps { 
  closeMenu?: () => void; 
}

function ServicesMenu({ closeMenu }: ServicesMenuProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => { 
    setOpen((prev) => !prev); 
  }; 
  
  const handleNavigation = () => { 
    setOpen(false); 
    closeMenu?.(); 
  };

  return (
    <div 
      className={styles.services} 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)} 
    >

      <button 
        type="button" 
        className={styles.servicesButton} 
        onClick={handleToggle} 
        aria-expanded={open} 
      >
        Servicios

        <ChevronDown 
          size={17} 
          className={`${styles.chevron} ${ open ? styles.chevronOpen : "" }`} 
        />

      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          <Link to="/specialties" className={styles.dropdownLink} onClick={handleNavigation} > Especialidades </Link>
          <Link to="/studies" className={styles.dropdownLink} onClick={handleNavigation} > Estudios y Prácticas </Link> 
          <Link to="/coberturas" className={styles.dropdownLink} onClick={handleNavigation} > Coberturas Médicas </Link> 
        </div>
       )}
    </div> 
  ); 
} 

export default ServicesMenu;