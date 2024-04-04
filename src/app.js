import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import userRoutes from './routes/user.routes.js'
import tasksRoutes from "./routes/task.routes.js";
import productsRoutes from "./routes/products.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",userRoutes);
app.use("/api",tasksRoutes);
app.use("/api",productsRoutes);
app.use("/api", carritoRoutes);


export default app;