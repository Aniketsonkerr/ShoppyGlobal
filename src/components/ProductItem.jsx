import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/productDetail/${product.id}`} className="block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <p className="text-lg font-semibold text-gray-800">
            Price: ${product.price}
          </p>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <p className="text-yellow-500 font-medium">
            Rating: {product.rating}
          </p>
        </div>
      </Link>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full m-4 hover:bg-blue-600 transition duration-200"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
