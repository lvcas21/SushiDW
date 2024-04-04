import React from 'react';

const ModalNotAuth = ({ handleClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <p className="text-xl mb-4 text-black">Debes iniciar sesión para añadir al carrito.</p>
        <button
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalNotAuth;
