import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { creaCarrito, borrarProductoCarrito, obtenerCarritoPorId } from "../controllers/carrito.controller.js";

const router = Router();

router.post('/carrito/crear-carrito/:productId', authRequired, creaCarrito);
// router.get('/carrito/agregar-producto-carrito/:userId/:productId', authRequired, agregarProductoCarrito);
router.delete('/carrito/borrar-producto-carrito/:productId', authRequired, borrarProductoCarrito);
router.get('/carrito/ver-carrito/', authRequired, obtenerCarritoPorId);


export default router;