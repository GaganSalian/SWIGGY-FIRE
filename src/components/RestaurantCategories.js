import React from "react";
import Itemlist from "./Itemlist.js";

const RestaurantCategories = ({ data, showItems, setShowIndex }) => {
  return (
    <div className="w-11/12 mx-auto my-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700 transition-all">
      {/* Category Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={setShowIndex}
      >
        <span className="font-bold text-lg dark:text-white">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="text-xl dark:text-white">
          {showItems ? "▲" : "▼"}
        </span>
      </div>

      {/* Item List */}
      {showItems && <Itemlist items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategories;
