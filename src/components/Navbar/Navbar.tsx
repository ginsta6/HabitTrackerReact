import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav
      className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-light-green`}
    >
      <div className={`${styles.containerFluid} container-fluid`}>
        {/* Brand */}
        <NavLink
          className={`${styles.navbarBrand}`}
          to="/"
          onClick={() => setNavOpen(false)}
          end
        >
          BimBam
        </NavLink>

        {/* Toggler */}
        <button
          className={`${styles.navbarToggler}`}
          type="button"
          onClick={() => setNavOpen((prev) => !prev)}
          aria-controls="navbarNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible section */}
        <div
          id="navbarNav"
          className={`collapse navbar-collapse ${
            styles.navbarCollapse
          } ${navOpen ? "show" : ""}`}
        >
          <ul className={`${styles.navbarNav} navbar-nav ms-auto`}>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink}${
                    isActive ? " active" : ""
                  }`
                }
                onClick={() => setNavOpen(false)}
              >
                Tracker
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/manage"
                className={({ isActive }) =>
                  `${styles.navLink}${
                    isActive ? " active" : ""
                  }`
                }
                onClick={() => setNavOpen(false)}
              >
                Habit Management
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
