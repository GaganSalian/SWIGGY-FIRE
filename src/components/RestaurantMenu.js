import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategories from "./RestaurantCategories.js";
import { useState, useEffect } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // detect if it's mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // <768px = mobile
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!resInfo) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="dark:bg-gray-900 min-h-screen py-6 px-4 sm:px-8">
      {/* Restaurant Header */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-800 dark:text-white">
          {name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {cuisines?.join(", ")}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm">
          <p className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-lg dark:bg-green-700 dark:text-green-200">
            ⭐ {avgRating} • {totalRatingsString}
          </p>
          <p className="mt-2 sm:mt-0 font-medium text-gray-700 dark:text-gray-200">
            {costForTwoMessage}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-3xl mx-auto">
        {categories.map((category, index) => (
          <RestaurantCategories
            key={category?.card?.card.title}
            data={category?.card?.card}
            index={index}
            showItems={isMobile ? index === showIndex : true} 
            setShowIndex={() =>
              isMobile
                ? setShowIndex(index === showIndex ? null : index) // accordion for mobile
                : null // do nothing on desktop
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
