import { LOGO_URL } from "../utils/constant.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { useSelector } from "react-redux";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const Header = () => {
  const [btnName, setBtnName] = useState("login");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
console.log(loggedInUser)
  // Subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="header flex justify-between m-10 border border-solid pl-5 pr-5 pt-2 pb-2 shadow-lg rounded-lg bg-orange-100 dark:bg-gray-800 text-black dark:text-white mb-6">
      <div className="logo-container">
        <img className="logo w-20" alt="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items pt-2">
        <ul className="flex items-center">
          <li className="p-4">Online: {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="p-4">
            <Link to="/" className="dark:hover:text-gray-300">
              Home
            </Link>
          </li>
          <li className="p-4">
            <Link to="/about" className="dark:hover:text-gray-300">
              About
            </Link>
          </li>
          <li className="p-4">
            <Link to="/contact" className="dark:hover:text-gray-300">
              Contact
            </Link>
          </li>
          <li className="p-4">
            <Link to="/grocery" className="dark:hover:text-gray-300">
              Grocery
            </Link>
          </li>
          <li className="p-4">
            <Link to="/cart" className="dark:hover:text-gray-300">
              Cart ({cartItems.length} items)
            </Link>
          </li>
          <li className="">user:{loggedInUser}</li>
          <button
            className={`login px-4 py-0 h-8 mt-2 rounded ${
              btnName === "login" ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
            onClick={() => {
              btnName === "login" ? setBtnName("logout") : setBtnName("login");
            }}
          >
            {btnName}
          </button>

          <button
            className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-700 text-white"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
