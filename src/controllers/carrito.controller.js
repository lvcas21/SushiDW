import Carrito from "../models/carrito.model.js";
import Producto from "../models/products.model.js";

// POST - Crea un nuevo carrito (compra, en este caso)
export const creaCarrito = async (req, res) => {
  try {
    const { item } = req.body
    const userId = req.user.id
    const productId = req.params.productId;


    const existingProduct = await Producto.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    let newCarrito = await Carrito.findOne({ user: userId });
    if (!newCarrito) {
      newCarrito = new Carrito({ user: userId, items: [] });
    } else {
      const result = await agregarProductoCarrito(req, res);
      return result;
    }

    newCarrito.item.push({ productId, ...item });

    const carritoSaved = await newCarrito.save();
    res.json(carritoSaved);

  } catch (error) {
    return res.status(500).json({ message: "Error al crear el carrito", error: error.message });
  }
};

//GET - Insertar producto al carrito
export const agregarProductoCarrito = async (req, res) => {
  try {
    const userId = req.user.id

    const carrito = await Carrito.findOne({ user: userId });

    const productId = req.params.productId;

    if (!carrito) {
      return res.status(400).send("Carrito no encontrado");
    }

    if (!productId) {
      return res.status(400).send("Producto no encontrado");
    }

    const itemsDelCarrito = carrito.item;

    itemsDelCarrito.push({ productId, ...req.body });

    const carritoSaved = await carrito.save();

    res.json(carritoSaved);


  } catch (error) {

    return res.status(500).json({ message: "Error al buscar el carrito", error: error.message });

  }
};

//DELETE - Borrar un producto del carrito
export const borrarProductoCarrito = async (req, res) => {
  try {
    const userId = req.user.id

    const carrito = await Carrito.findOne({ user: userId });

    const productId = req.params.productId;

    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const productoIndex = carrito.item.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productoIndex === -1) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    carrito.item.splice(productoIndex, 1);
    await carrito.save();

    return res.status(200).json({ message: 'Producto eliminado del carrito correctamente', carrito });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al borrar el producto del carrito' });
  }
};

//GET - Obtiene un carrito por su ID
export const obtenerCarritoPorId = async (req, res) => {
  try {
    const userId = req.user.id
    const carrito = await Carrito.findOne({ user: userId });

    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productId = carrito.item.map(item => item.productId);

    const producto = await Producto.find({ _id: { $in: productId } }, { title: 1, price: 1 });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    res.json(producto);

  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
  }
};
