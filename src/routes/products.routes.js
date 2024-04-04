import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { getProduct, createProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products.controller.js'
import {createProductSchema} from '../schemas/product.schema.js'

const router = Router();

/* Cualquier Usuario */
router.get('/products', getProducts);

/*Usuarios registrados*/
// router.get('products/:id', authRequired, getProduct);

/* Solo Administradores */
router.get('/admin/products', authRequired, getProducts);
router.post('/admin/products', authRequired, validateSchema(createProductSchema), createProduct);
router.get('/admin/products/:id', authRequired, getProduct);
router.delete('/admin/products/:id', authRequired, deleteProduct);
router.put('/admin/products/:id', authRequired, updateProduct);

export default router;