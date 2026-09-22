import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { ChevronDown, User } from "lucide-react"; 
import styles from "./UserMenu.module.css";

interface UserMenuProps { 
  closeMenu?: () => void; 
  onLogout: () => void;
}

function UserMenu({ closeMenu,  onLogout }: UserMenuProps) {
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
      className={styles.usermenu} 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)} 
    >

      <button 
        type="button" 
        className={styles.userButton} 
        onClick={handleToggle} 
        aria-expanded={open} 
      >
        <User 
          size={17} 
          className={`${styles.user}`} 
        />

      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          <Link to="/profile" className={styles.dropdownLink} onClick={handleNavigation} > Mi perfil </Link>
          <Link to="/appointments" className={styles.dropdownLink} onClick={handleNavigation} > Mis turnos </Link> 
        </div>
       )}
    </div> 
  ); 
} 

export default UserMenu;