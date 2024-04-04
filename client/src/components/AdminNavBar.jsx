import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function AdminNavBar() {
  const [activeLink, setActiveLink] = useState("");

  return (
    <nav className="bg-gray-300/80 items-center ">
      <ul className="flex gap-x-32 text-black justify-center text-xl items-center py-2">
        <li>
          <NavLink
            to={"/admin"}
            className={`hover:bg-gray-400/30 p-2 px-3 rounded-sm transition duration-300 ease-in-out ${activeLink === "/admin" ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveLink("/admin")}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/finanzas"}
            className={`hover:bg-gray-400/30 p-2 px-3 rounded-sm transition duration-300 ease-in-out ${activeLink === "/admin/finanzas" ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveLink("/admin/finanzas")}
          >
            Finanzas
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/products"}
            className={`hover:bg-gray-400/30 p-2 px-3 rounded-sm transition duration-300 ease-in-out ${activeLink === "/admin/products" ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveLink("/admin/products")}
          >
            Stock
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/add-product"}
            className={`hover:bg-gray-400/30 p-2 px-3 rounded-sm transition duration-300 ease-in-out ${activeLink === "/admin/add-product" ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveLink("/admin/add-product")}
          >
            +
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavBar;
