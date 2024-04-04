import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function StockPage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return <h1>No products</h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 gap-y-10 py-10">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default StockPage;
