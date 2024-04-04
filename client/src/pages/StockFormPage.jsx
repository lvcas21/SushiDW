import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import sushi from "../assets/sushi_stock.png";

function StockFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProduct();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("price", product.price);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate("/admin/products");
  });

  return (
      <div className="bg-white max-w-sm w-full p-6 rounded-md overflow-hidden shadow-lg">
        <img
          src={sushi}
          alt="Product"
          className="w-full h-40 object-cover mb-4"
        />
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-gray-200 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-gray-200 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500"
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            {...register("price")}
            className="w-full bg-gray-200 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
  );
}

export default StockFormPage;
