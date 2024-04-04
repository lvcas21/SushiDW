import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    item: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Carrito", carritoSchema);