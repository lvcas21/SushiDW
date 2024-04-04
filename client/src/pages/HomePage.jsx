import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";

function HomePage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return <h1>No products</h1>;
  }

  return (
    <div>
      <div className="hero">
        <div className="contenido-hero">
          <h1 className="text-white text-4xl font-mono">¡DISFRUTA DEL MEJOR SUSHI!</h1>
          <p className="text-white text-2xl font-mono">revisa nuestras promociones y ofertas</p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3 gap-y-10 py-10">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
