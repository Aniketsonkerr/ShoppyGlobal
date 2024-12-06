import { useState, useEffect, useMemo } from "react"; // React hooks for state, lifecycle, and memoization.
import useFetch from "../utils/useFetch"; // Custom hook for fetching data.
import ProductItem from "./ProductItem"; // Component to display individual product details.

function ProductList() {
  // State to hold the list of products and the search input value.
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch data using the custom `useFetch` hook.
  const { data, error, loading } = useFetch("https://dummyjson.com/products");

  // Memoized list of unique product categories, recalculated only when `products` changes.
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  // Update the `products` state when data is fetched successfully.
  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  // Memoized list of products filtered based on the search input.
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  // Handle the loading state.
  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-8">Loading products...</div>
    );
  }

  // Handle the error state.
  if (error) {
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  }

  return (
    <div className="product-list container mx-auto py-12 px-4">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a product"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText} // Controlled input field.
          onChange={(e) => setSearchText(e.target.value)} // Update `searchText` state on user input.
        />
      </div>

      {/* Categories Navigation */}
      <div className="categories-nav mb-8">
        <ul className="flex flex-wrap justify-center gap-4">
          {/* Generate a list of category links dynamically */}
          {categories.map((category) => (
            <li key={category}>
              <a
                href={`#${category}`} // Anchor links for category sections.
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          // Render filtered products if any match the search text.
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          // Display a message if no products match the search.
          <p className="col-span-full text-center text-gray-600">
            No products match your search.
          </p>
        )}
      </div>

      {/* Categories Section */}
      {categories.map((category) => (
        <div className="category-section mt-12" key={category} id={category}>
          {/* Display category title */}
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render products under each category */}
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList; // Export the component for use in other parts of the application.
