import { createContext, useContext } from "react";
import { useState } from "react";

import {
  getProductRequest,
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await getProductsRequest();
      setProducts(
        response.data.map((product) => ({
          ...product,
          price: parseFloat(product.price), // O parseInt según sea necesario
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    const productToSend = {
      ...product,
      price: parseFloat(product.price),
    };

    const res = await createProductRequest(productToSend);
    console.log(res);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204)
        setProducts(products.filter((products) => products._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const productToSend = {
        ...product,
        price: parseFloat(product.price),
      };
      await updateProductRequest(id, product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        deleteProduct,
        getProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
