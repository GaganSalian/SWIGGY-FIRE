import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { SWIGGY_API } from "../utils/constant";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API);
      const json = await response.json();

      const restaurantsList =
        json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRestaurants(restaurantsList);
      setFilteredRestaurants(restaurantsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filteredList = restaurants.filter((res) =>
      res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredList);
  };

  const handleTopRatedFilter = () => {
    const filteredList = restaurants.filter((res) => res.info?.avgRating > 4.5);
    setFilteredRestaurants(filteredList);
  };

  if (onlineStatus === false) {
    return (
      <div className="text-center mt-20 text-2xl font-bold dark:text-white">
        Looks like you&apos;re offline! 🛑
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="body dark:bg-gray-800 dark:text-white">
        <Shimmer />
      </div>
    );
  }

  return (
    <main className="body dark:bg-gray-800 dark:text-white min-h-screen">
      <h2 className="text-center text-3xl font-extrabold mb-8 mt-4">
        Restaurants in Manipal 🏙️
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center px-8 mb-10">
        {/* Search Box */}
        <div className="flex items-center gap-4">
          <label htmlFor="search" className="sr-only">
            Search Restaurants
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all"
          >
            Search
          </button>
        </div>

        {/* Top Rated Button */}
        <button
          onClick={handleTopRatedFilter}
          className="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Body;
