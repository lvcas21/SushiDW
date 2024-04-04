import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    rut: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    numeroTelefono: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: String,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    comuna: {
      type: String,
      required: true,
    },
    provincia: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
