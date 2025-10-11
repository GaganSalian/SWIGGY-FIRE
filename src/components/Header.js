import { LOGO_URL } from "../utils/constant.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { useSelector } from "react-redux";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import logo from "../img/pngaaa.png";

const Header = () => {                   
  const [btnName, setBtnName] = useState("login");
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (   
   <header className="flex flex-wrap justify-between  mx-10 items-center px-8 py-3 border border-gray-200 rounded-b-xl shadow-md bg-orange-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
  {/* Logo */}
  <Link to="/" className="flex items-center gap-2">
    <img
      src={logo}
      alt="Swiggy Logo"
      className="w-20 hover:scale-105 transition-transform duration-300"
    />
    <span className="text-lg font-bold tracking-wide hidden sm:block">
      Good FOOD
    </span>
  </Link>

  {/* Navigation */}
  <nav className="flex flex-wrap items-center gap-4 md:gap-6">
    <span className="text-lg font-medium">
      Online:{" "}
      <span className={onlineStatus ? "text-green-500" : "text-red-500"}>
        {onlineStatus ? "🟢" : "🔴"}
      </span>
    </span>

    <NavLink to="/" label="Home" />
    <NavLink to="/about" label="About" />
    <NavLink to="/contact" label="Contact" />
    <NavLink to="/grocery" label="Grocery" />
    <NavLink to="/cart" label={`Cart (${cartItems.length})`} />

    {/* User Info */}
    <span className="hidden md:inline text-lg italic font-medium text-gray-700 dark:text-gray-300">
      {loggedInUser ? `👤 ${loggedInUser}` : "Guest"}
    </span>

    {/* Login/Logout Button */}
    <button
      onClick={() => setBtnName(btnName === "login" ? "logout" : "login")}
      className={`px-4 py-1.5 rounded-lg text-white font-semibold shadow-sm transition-all duration-300 ${
        btnName === "login"
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {btnName}
    </button>

    {/* Dark Mode Toggle */}
    <button
      onClick={toggleDarkMode}
      className="ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-400 transition-all duration-300 shadow-sm"
    >
      {isDarkMode ? (
        <SunIcon className="w-5 h-5 text-yellow-300" />
      ) : (
        <MoonIcon className="w-5 h-5 text-white" />
      )}
    </button>
  </nav>
</header>

  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-base font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-150"
  >
    {label}
  </Link>
);

export default Header;
