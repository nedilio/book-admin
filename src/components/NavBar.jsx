import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to={"/book-admin"}>Administrador</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
