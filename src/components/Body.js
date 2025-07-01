import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { SWIGGY_API } from "../utils/constant";

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
        SWIGGY_API,
          {
        headers: {
          "x-cors-api-key": "temp_406d80f7e4dc23895b53764ad01a09c8",
        },
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

  const { loggedInUser, setUserName } = useContext(UserContext);

  if (listOfRestaurent.length === 0) {
    return(
      <div className="body dark:bg-gray-800 dark:text-white">
     <Shimmer />
     </div>
    )
  }

  return (
    <div className="body dark:bg-gray-800 dark:text-white">
    <div className="p-6 text-center text-2xl font-bold leading-relaxed dark:🌆">Restaurants in Manipal...🏙️</div>
      <div className="filter flex justify-between pr-24">
      
        <div className="search m-3 p-4 flex flex-col">
       <div>
          <input
            type="text"
            className="search-box border border-solid border-black rounded-md ml-20 p-2 dark:bg-gray-700 dark:text-white"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <button
            className="ml-4 bg-red-500 p-1 rounded-md text-white transform hover:scale-105 hover:z-10 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
          </div>
        </div>

        <button
          className="filter-btn bg-red-500 p-1 h-9 mt-6 rounded-md text-white transform hover:scale-105 hover:z-10 transition-all"
          onClick={handleTopRatedFilter}
        >
          Top Rated Restaurant
        </button>
        {/* <div className="mt-1  relative z-10 flex">
        <label className="block text-lg font-medium dark:text-white pr-2">User:</label>
        <input
          className="border border-black pl-4 p-0  rounded-md   dark:bg-gray-700 dark:text-white"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div> */}
      </div>
      
         <div className="res-container flex flex-wrap justify-around m-12 mt-0">
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
