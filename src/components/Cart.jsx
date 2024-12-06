import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../utils/cartSlice";
import CartItems from "./CartItem";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const renderCartItem = (item) => (
    <div key={item.id} style={cartItemStyle}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );

  return (
    <div className="cart">
      {cartItems.length > 0 ? (
        <CartItems
          items={cartItems}
          renderItem={renderCartItem}
          onRemove={handleRemoveFromCart}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

// Inline styles (optional, replace with CSS for larger projects)
const cartItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

export default Cart;
