import { getProduct } from '../controllers/products.controller.js';
import { creaCarrito } from '../controllers/carrito1.controller.js';

export const nuevoCarrito = async (req, res, next) => {
    try {
      await getProduct(req, res);
  
      await creaCarrito(req, res);
  
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error en la operación', error: error.message });
    }
  };

  