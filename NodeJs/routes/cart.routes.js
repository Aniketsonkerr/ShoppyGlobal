import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controller/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export function cartRoutes(app) {
  app.post("/api/cart", verifyToken, addToCart);
  app.put("/api/cart/:id", verifyToken, updateCartItem);
  app.delete("/api/cart/:id", verifyToken, removeFromCart);
  app.get("/api/cart", verifyToken, getCart);
}
