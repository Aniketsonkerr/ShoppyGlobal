import { useRouteError } from "react-router-dom"; // Hook to access the error object from the route.

function NotFound() {
  const err = useRouteError(); // Retrieves the error object for the current route.

  return (
    <>
      {/* Display the error message returned from the route */}
      <h1>{err.data}</h1>

      {/* Display the error status code (e.g., 404, 500) */}
      <h1>{err.status}</h1>
    </>
  );
}

export default NotFound; // Export the component for use in the application.
