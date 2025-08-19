import { LOGO_URL } from "../utils/constant.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { useSelector } from "react-redux";
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const Header = () => {
  const [btnName, setBtnName] = useState("login");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 border rounded-lg shadow-md bg-orange-50 dark:bg-gray-800 text-black dark:text-white">
      {/* Logo */}
      <Link to="/">
        <img
          src={LOGO_URL}
          alt="Swiggy Logo"
          className="w-24 hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <span className="text-sm font-semibold">
          Online: {onlineStatus ? "🟢" : "🔴"}
        </span>

        <NavLink to="/" label="Home" />
        <NavLink to="/about" label="About" />
        <NavLink to="/contact" label="Contact" />
        <NavLink to="/grocery" label="Grocery" />
        <NavLink to="/cart" label={`Cart (${cartItems.length})`} />

        {/* User Info */}
        <span className="text-sm font-medium italic">
          {loggedInUser ? `User: ${loggedInUser}` : "Guest"}
        </span>

        {/* Login/Logout Button */}
        <button
          onClick={() => {
            setBtnName(btnName === "login" ? "logout" : "login");
          }}
          className={`px-4 py-2 rounded text-white font-semibold transition-colors duration-200 ${
            btnName === "login"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {btnName}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-400 transition-colors duration-200"
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-300" />
          ) : (
            <MoonIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white"
      >
        {isMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
      </button>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-orange-50 dark:bg-gray-800 shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
          <span className="text-sm font-semibold">
            Online: {onlineStatus ? "🟢" : "🔴"}
          </span>
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/grocery" label="Grocery" />
          <NavLink to="/cart" label={`Cart (${cartItems.length})`} />
          <span className="text-sm font-medium italic">
            {loggedInUser ? `User: ${loggedInUser}` : "Guest"}
          </span>
          <button
            onClick={() => {
              setBtnName(btnName === "login" ? "logout" : "login");
            }}
            className={`px-4 py-2 rounded text-white font-semibold transition-colors duration-200 ${
              btnName === "login"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {btnName}
          </button>
          <button
            onClick={toggleDarkMode}
            className="ml-1 w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-400 transition-colors duration-200"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-150"
  >
    {label}
  </Link>
);

export default Header;
