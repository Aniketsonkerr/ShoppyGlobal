function CartItems({ items, renderItem, onRemove, onAddToCart }) {
  return (
    <div className="cart-items space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
        >
          {/* Product Thumbnail and Details */}
          <div className="flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>{renderItem(item)}</div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRemove(item.id)}
              className="bg-red-500 text-white rounded-md px-3 py-1 font-semibold hover:bg-red-600 transition duration-200"
              aria-label="Decrease Quantity"
            >
              -
            </button>
            <span className="text-lg font-semibold">{item.quantity}</span>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-green-500 text-white rounded-md px-3 py-1 font-semibold hover:bg-green-600 transition duration-200"
              aria-label="Increase Quantity"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
