import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: String,
  stockQuantity: String,
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
