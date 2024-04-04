import axios from "./axios";

export const creaCarritoRequest = (productId) => axios.post(`/carrito/crear-carrito/${productId}`)
export const obtenerCarritoPorIdRequest = () => axios.get(`/carrito/ver-carrito/`)
export const borrarProductoCarritoRequest = (productId) => axios.delete(`/carrito/borrar-producto-carrito/${productId}`)
// export const agregarProductoCarritoRequest