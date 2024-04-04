import Product from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user");
    res.json(products);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      user: req.user.id,
    });

    const productSaved = await newProduct.save();
    res.json(productSaved);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user");
    if (!product) return res.status(404).json({ message: "Product not Found" });
    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not Found" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Product not Found" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not Found" });
  }
};
