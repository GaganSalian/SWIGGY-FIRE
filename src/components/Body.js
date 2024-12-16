import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurent, setlistOfRestaurent] = useState([]);
  const [filterdRestaurent, setfilterdRestaurent] = useState([]);
  const [searchText, setsearchText] = useState("");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.3730376&lng=74.7071271&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      const restaurants =
        json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setlistOfRestaurent(restaurants);
      setfilterdRestaurent(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filteredList = listOfRestaurent.filter((res) =>
      res.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilterdRestaurent(filteredList);
  };

  const handleTopRatedFilter = () => {
    const filteredList = listOfRestaurent.filter((res) => res.info?.avgRating > 4.5);
    setfilterdRestaurent(filteredList);
  };

  if (onlineStatus === false) return <h1>Looks like you're offline!</h1>;

  if (listOfRestaurent.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body dark:bg-gray-800 dark:text-white">
      <div className="filter flex">
        <div className="search m-3 p-4">
          <input
            type="text"
            className="search-box border border-solid border-black rounded-sm ml-20"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <button
            className="ml-4 bg-red-500 p-1 rounded-md text-white align-middle transform hover:scale-105 hover:z-10 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn bg-red-500 p-1 h-9 mt-6 rounded-md text-white align-middle transform hover:scale-105 hover:z-10 transition-all"
          onClick={handleTopRatedFilter}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container flex flex-wrap justify-around m-12 mt-0 overflow-hidden">
        {filterdRestaurent.map((restaurant) => (
          <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
