import cartModel from "../models/cart.model.js";

// fetch all cart products
export function getCart(req, res) {
  cartModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching products", error });
    });
}

// Add a product to the cart
export function addToCart(req, res) {
  const { title, description, category, price, quantity } = req.body;
  const cartItem = new cartModel({
    title: title,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
  });
  cartItem
    .save()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Something went wrong" });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error adding item to cart", error });
    });
}

// Update product quantity in the cart
export function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  cartModel
    .findByIdAndUpdate(id, { quantity: quantity }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating cart item", error });
    });
}

// Remove a product from the cart
export function removeFromCart(req, res) {
  const { id } = req.params;

  cartModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }
      res.send({ message: "Item removed from cart", data });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error removing cart item", error });
    });
}
