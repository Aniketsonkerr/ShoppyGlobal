import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const cartItems = useSelector((store) => store.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold">
          ShoppyGlobal
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0 z-10`}
        >
          <li>
            <Link
              to={"/"}
              className="block hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/productList"}
              className="block hover:text-gray-300 transition duration-200"
            >
              Product List
            </Link>
          </li>
          <li>
            <Link to={"/signIn"}>Sign In</Link>
          </li>
          <li>
            <Link to={"/fetchItems"}>Fetched items</Link>
          </li>
          <li className="relative">
            <Link
              to={"/cart"}
              className="flex items-center hover:text-gray-300 transition duration-200"
            >
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
