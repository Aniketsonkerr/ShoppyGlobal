import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  const { data, error, loading } = useFetch("https://dummyjson.com/products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (error) {
    return <h1 className="text-red-500 text-center mt-8">{error}</h1>;
  }

  if (loading) {
    return <p className="text-gray-600 text-center mt-8">Loading...</p>;
  }

  return (
    <div className="home bg-gray-50">
      {/* Welcome Section */}
      <div className="welcome text-center py-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome</h1>
        <h3 className="text-xl md:text-2xl mb-2">to</h3>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">ShoppyGlobal</h1>
        <Link
          to={"/productList"}
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
        >
          Get Started
        </Link>
      </div>

      {/* Top Products Section */}
      <div className="top-products container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Top Products</h1>
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <div
              className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              key={product.id}
            >
              <Link to={`/productItem/${product.id}`} className="block">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="product-title text-xl font-bold mb-2">
                    {product.title}
                  </h2>
                  <p className="product-price text-lg font-semibold text-gray-800">
                    Price: ${product.price}
                  </p>
                  <p className="product-description text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <p className="product-rating text-yellow-500 font-medium">
                    Rating: {product.rating}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="best-sellers container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Best Sellers</h1>
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(6, 12).map((product) => (
            <div
              className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              key={product.id}
            >
              <Link to={`/productItem/${product.id}`} className="block">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="product-title text-xl font-bold mb-2">
                    {product.title}
                  </h2>
                  <p className="product-price text-lg font-semibold text-gray-800">
                    Price: ${product.price}
                  </p>
                  <p className="product-description text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <p className="product-rating text-yellow-500 font-medium">
                    Rating: {product.rating}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
