import React from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import styles from './assets/NavBar.module.css';
import { axios } from '../axios';

export default function NavBar() {
  return (
    <div id="navbar">
      <nav className={styles["navbar"]}>
        <ul className={styles["navbar__menu"]}>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>User Info</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Schedule</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Registration</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Find Classes</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/login`} onClick={async () => {
            await axios.get('/api/logout');
          }}>Logout</Link></li>
          {/* We can make the log out button double confirmation about logging out later on */}
        </ul>
      </nav>
    </div>
  );
}
