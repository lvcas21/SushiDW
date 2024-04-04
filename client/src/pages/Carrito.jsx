import React from 'react';
import '../styles/Modal.css';
import { MdDelete } from "react-icons/md";
import { useCarrito } from '../context/CarritoContext';

export default function Carrito({ showModal, closeModal, productos }) {

  const { borrarProducto } = useCarrito();

  const handleDelete = async (productId) => {
    await borrarProducto(productId);
  };

  return (
    showModal && (
      <div className="modalBackground" onClick={closeModal}>
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <button className='btn-cerrar-carrito' onClick={closeModal}>x</button>
          <h2 className='text-2xl font-bold'>TU PEDIDO:</h2>
          {productos && productos.length > 0 ? (
            <ul className='Pedidos'>
              {productos.map((producto) => (
                <li key={producto._id}>
                  <div className="productoInfo">
                    <span className='tituloProducto'>{producto.title}</span>
                    <span className='precioProducto'>${producto.price}</span>
                  </div>
                  <button onClick={() => handleDelete(producto._id)}>
                    <MdDelete size={21} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
          <button className=' bg-red-600 hover:bg-red-900 p-2 rounded-md text-white' id='btn-Comprar'>Comprar</button>
        </div>
      </div>
    )
  );
};



