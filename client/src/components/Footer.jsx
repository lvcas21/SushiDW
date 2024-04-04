import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav className="bg-black flex justify-center py-3 px-10">
      <Link to={"/"}>
        <h1 className="text-md">Todos los derechos reservados.</h1>
      </Link>
    </nav>
  );
}

export default Footer;
