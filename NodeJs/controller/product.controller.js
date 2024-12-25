import productModel from "../models/product.model.js";

//adding products
export function addProduct(req, res) {
  const { title, description, category, price, stockQuantity } = req.body;
  const productItem = new productModel({
    title,
    description,
    category,
    price,
    stockQuantity,
  });
  productItem
    .save()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Something went wrong" });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error adding product", error });
    });
}

// Fetch all products
export function getAllProducts(req, res) {
  productModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching products", error });
    });
}

// Fetch a single product by ID
export function getProductById(req, res) {
  const { id } = req.params;

  productModel
    .findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error fetching product details", error });
    });
}
