import { useParams } from "react-router-dom"; // For extracting the dynamic 'id' from the URL.
import useFetch from "../utils/useFetch"; // Custom hook to fetch data from the API.
import "./style.css"; // Styles for the component.

function ProductDetail() {
  // Extract the 'id' parameter from the route.
  const { id } = useParams();

  // Use the custom hook to fetch product details.
  const { data, error, loading } = useFetch(
    `https://dummyjson.com/products/${id}` // API endpoint with dynamic 'id'.
  );

  // Display a loading message while data is being fetched.
  if (loading) return <div>Loading product details...</div>;

  // Display an error message if there was an issue with fetching data.
  if (error) return <div>Error: Unable to load product details.</div>;

  // Handle the case where no data is returned (product not found).
  if (!data) return <div>Product not found.</div>;

  // Destructure the necessary fields from the fetched product data.
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    images,
    thumbnail,
  } = data;

  return (
    <div className="product-detail">
      {/* Product Overview */}
      <div className="product-overview">
        {/* Display product thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
        />
        {/* Display product title and description */}
        <h1>{title}</h1>
        <p>{description}</p>

        {/* Display various product attributes */}
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Price:</strong> ${price}{" "}
          <span style={{ color: "red" }}>({discountPercentage}% off)</span>
        </p>
        <p>
          <strong>Rating:</strong> {rating} / 5
        </p>
        <p>
          <strong>Stock Status:</strong> {availabilityStatus} ({stock} left)
        </p>
        <p>
          <strong>Tags:</strong> {tags.join(", ")}
        </p>
        <p>
          <strong>SKU:</strong> {sku}
        </p>
        <p>
          <strong>Weight:</strong> {weight}g
        </p>
        <p>
          <strong>Dimensions:</strong> {dimensions.width}x{dimensions.height}x
          {dimensions.depth} cm
        </p>
        <p>
          <strong>Warranty:</strong> {warrantyInformation}
        </p>
        <p>
          <strong>Shipping:</strong> {shippingInformation}
        </p>
        <p>
          <strong>Return Policy:</strong> {returnPolicy}
        </p>
        <p>
          <strong>Minimum Order Quantity:</strong> {minimumOrderQuantity}
        </p>
      </div>

      {/* Product Images Section */}
      <div className="product-images">
        <h2>Product Images</h2>
        <div className="images-gallery">
          {/* Display all product images */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - ${index + 1}`}
              style={{
                width: "100px",
                height: "auto",
                marginRight: "10px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-reviews">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>Reviewer:</strong> {review.reviewerName}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <p>
                <em>{new Date(review.date).toLocaleDateString()}</em>
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
      </div>

      {/* Metadata Section */}
      <div className="product-meta">
        <h2>Product Metadata</h2>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(meta.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(meta.updatedAt).toLocaleString()}
        </p>
        <p>
          <strong>Barcode:</strong> {meta.barcode}
        </p>
        {/* Display QR code */}
        <img
          src={meta.qrCode}
          alt="QR Code"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
