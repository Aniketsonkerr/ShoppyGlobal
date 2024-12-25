import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: String,
  quantity: String,
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
