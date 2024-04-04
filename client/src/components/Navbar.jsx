import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import sushiLogo from "../assets/sushi.png";
import { BsCart3 } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import Carrito from "../pages/Carrito";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  //CARRITO
  const [showModal, setShowModal] = useState(false);
  const { productosCarrito } = useCarrito();

  const openModal = () => { //para abrirlo
    setShowModal(true);
  };

  const closeModal = () => { //para cerrarlo
    setShowModal(false);
  };

  return (
    <div>
      <nav className="bg-black flex justify-between py-5 px-10 rounded-sm items-center">
        <Link to={"/"} className="flex justify-between items-center">
          <img src={sushiLogo} alt="logo" className="w-32" />
          <h1 className="text-5xl font-bold">Fukusuke</h1>
        </Link>
        <ul className="flex gap-x-5 items-center text-lg">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <Link
                    to={"/admin"}
                    className="hover:bg-gray-800 p-2 px-5 rounded-md"
                  >
                    Administrar
                  </Link>
                </>
              ) : (
                <></>
              )}
              <div className="flex items-center gap-x-2">
                <li>
                  <Link
                    to={"/carta"}
                    className=" flex items-center gap-x-2 p-2 px-5 rounded-md hover:bg-gray-800"
                  >
                    <BiFoodMenu size={21} />
                    Menu
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="flex items-center gap-x-2 p-2 px-5 rounded-md hover:bg-gray-800" onClick={openModal}
                  >
                    <BsCart3 size={21} />
                    Carrito
                  </Link>
                </li>
                <div className="flex items-center gap-x-3">
                  <li>Hola, {user.username}!</li>
                  <li>
                    <Link
                      to={"/"}
                      className="bg-red-500/30 hover:bg-red-900 p-3 rounded-md"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={"/carta"}
                  className=" flex items-center gap-x-2 p-2 px-5 rounded-md hover:bg-gray-800"
                >
                  <BiFoodMenu size={21} />
                  Menu
                </Link>
              </li>
              <li className="">
                <Link
                  className="flex items-center gap-x-2 p-2 px-5 rounded-md hover:bg-gray-800" onClick={openModal}
                >
                  <BsCart3 size={21} />
                  Carrito
                </Link>
              </li>
              <li>
                <Link to={"/login"} className=" bg-red-800 hover:bg-red-900 p-2 rounded-md   ">
                  Iniciar Sesion
                </Link>
              </li>
            </>
          )}
        </ul>
        <Carrito showModal={showModal} closeModal={closeModal} productos={ productosCarrito }/>
      </nav>
    </div>

  );
}

export default Navbar;
