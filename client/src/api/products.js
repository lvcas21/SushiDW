import axios from "./axios";

export const getProductsRequest = () => axios.get(`/products`);

export const getProductRequest = (id) => axios.get(`/admin/products/${id}`);

export const createProductRequest = (product) => axios.post(`/admin/products/`, product);

export const updateProductRequest = (id, product) => axios.put(`/admin/products/${id}`, product);

export const deleteProductRequest = (id) => axios.delete(`/admin/products/${id}`);