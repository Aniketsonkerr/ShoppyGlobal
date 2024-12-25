import express from "express";
import mongoose from "mongoose";
import { cartRoutes } from "./routes/cart.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { userRoutes } from "./routes/user.routes.js";
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connection successful");
});

db.on("error", () => {
  console.log("Database connection failed");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});

cartRoutes(app);
productRoutes(app);
userRoutes(app);
