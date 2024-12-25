import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controller/product.controller.js";

export function productRoutes(app) {
  app.get("/api/products", getAllProducts);
  app.get("/api/product/:id", getProductById);
  app.post("/api/product", addProduct);
}
