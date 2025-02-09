import { useState, useEffect } from "react";

function Fetchitems() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // ✅ State for error handling
  const [loading, setLoading] = useState(true); // ✅ State for loading status

  // Fetch product items from API
  async function fetchProductItems() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoading(true); // Start loading

      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setProducts(result);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
      setError(error.message); // Update error state
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Run the fetch function once when the component mounts
  useEffect(() => {
    fetchProductItems();
  }, []); // ✅ Empty dependency array to ensure it runs once

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-medium">Category: {product.category}</p>
            <p className="text-green-600 font-semibold">
              Price: ${product.price}
            </p>
            <p className="text-gray-500">Stock: {product.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fetchitems;
