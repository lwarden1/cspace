import React from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import styles from '@css/NavBar.module.css';
import { axios } from '@/axios';
import { ReactComponent as Profile } from '@assets/user-circle.svg';

export default function NavBar() {
  return (
    <div id="navbar">
      <nav className={styles["navbar"]}>
        {/* Put logo here to the left */}
        <ul className={styles["navbar__menu"]}>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>User Info</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Schedule</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Registration</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/`}>Find Classes</Link></li>
          <li className={styles["navbar__menu-item"]}><Link to={`/login`} onClick={async () => {
            await axios.post('/logout').catch((err) => console.error(err));
          }}>Logout</Link></li>
          <li className={styles["navbar__menu-item"]}><Profile width='2em' height='2em' /></li>
          {/* We can make the log out button double confirmation about logging out later on */}
          {/* Put user logo here to the right, maybe hide logout under it */}
        </ul>
      </nav>
    </div>
  );
}
