import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

import {
    creaCarritoRequest,
    obtenerCarritoPorIdRequest,
    borrarProductoCarritoRequest,

} from "../api/carrito";

const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error("useCarrito must be used within a CarritoProvider");
    }

    return context;
};

export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([])

    const creaCarrito = async (productId) => {
        try {
            const res = await creaCarritoRequest(productId);
            verCarrito();
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const verCarrito = async () => {
        try {
            const response = await obtenerCarritoPorIdRequest();
            const itemsCarrito = response.data.map((item) => ({
                _id: item._id,
                title: item.title,
                price: parseInt(item.price),
            }));
            setProductosCarrito(itemsCarrito);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        verCarrito();
    }, []);

    const borrarProducto = async (productId) => {
        try {
            const res = borrarProductoCarritoRequest(productId)
            if (res.status === 204) {
                setProducts(productosCarrito.filter((products) => products._id !== id));
            }
            verCarrito();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito, //array
                creaCarrito,
                verCarrito,
                borrarProducto
            }}
        >
            {children}
        </CarritoContext.Provider>
    );

}


