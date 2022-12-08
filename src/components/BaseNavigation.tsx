import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import styles from "./BaseNavigation.module.scss";

const BaseNavigation = () => {
  const { token, setToken } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarClasses = [styles.sidebar, isOpen ? styles.open : ""].join(" ");
  const navIcon = isOpen ? <AiOutlineClose /> : <AiOutlineMenu />;

  return (
    <>
      <div className={styles.navigation}>
        <Link to="/">
          <h1>
            THE BLOG <span>{token ? "Hi, admin!" : ""}</span>
          </h1>
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className={styles["nav-icon"]}>
          <button>{navIcon}</button>
        </div>
      </div>

      <div className={sidebarClasses} onClick={() => setIsOpen(false)}>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          {token ? (
            <>
              <Link to="/admin-dashboard">
                <li>Admin Dashboard</li>
              </Link>
              <Link to="/" onClick={() => setToken("")}>
                <li>Logout</li>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default BaseNavigation;
