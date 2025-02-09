import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controller/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export function productRoutes(app) {
  app.get("/api/products", verifyToken, getAllProducts);
  app.get("/api/product/:id", getProductById);
  app.post("/api/product", addProduct);
}
