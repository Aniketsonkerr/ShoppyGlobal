import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../src/components/NotFound.jsx";
import Home from "./components/Home.jsx";
import { lazy, Suspense } from "react";

const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductItem = lazy(() => import("./components/ProductItem.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const SignIn = lazy(() => import("./components/SignIn.jsx"));
const Fetchitems = lazy(() => import("./components/FetchItems.jsx"));

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/productList",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <ProductList />,
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <Cart />,
          </Suspense>
        ),
      },
      {
        path: "/productItem/:id",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <ProductItem />
          </Suspense>
        ),
      },
      {
        path: "/productDetail/:id",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <ProductDetail />,
          </Suspense>
        ),
      },
      {
        path: "/signIn",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/fetchItems",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <Fetchitems />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRoute}></RouterProvider>
  </StrictMode>
);
