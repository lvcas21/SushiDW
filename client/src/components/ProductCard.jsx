import { useProduct } from "../context/ProductContext";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import sushi from "../assets/sushi_stock.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ModalNotAuth from "../pages/ModalNotAuth";

function ProductCard({ product }) {
  const { deleteProduct } = useProduct();
  const { isAdmin } = useAuth();
  const { creaCarrito } = useCarrito();

  //ModalNotAuth
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowModal(true); // Muestra el modal si el usuario no está autenticado
    } else{
      creaCarrito(product._id)
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white max-w-sm w-full rounded-md overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={sushi} alt="Product" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 text-black">{product.title}</h1>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <p className="text-gray-800 font-bold text-lg">${product.price}</p>
        {showModal && <ModalNotAuth handleClose={handleCloseModal} />}
        { isAdmin ? (
          <>
            <div className="flex mt-4">
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteProduct(product._id)}
              >
                Eliminar
              </button>
              <Link
                to={`/admin/products/${product._id}`}
                className="ml-2 bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded"
              >
                Editar
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex mt-4">
              <button
                className="bg-sky-950 hover:bg-sky-950/80 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}
              >
                Añadir al Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
