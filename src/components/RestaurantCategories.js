import React from "react";
import Itemlist from "./Itemlist.js";

const RestaurantCategories = ({ data, showItems, setShowIndex, index, isMobile }) => {
  const handleClick = () => {
    if (setShowIndex) {
      setShowIndex(index === showItems ? null : index);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700 transition-all">
      {/* Category Header */}
      <div
        className={`flex justify-between items-center ${
          !isMobile ? "cursor-pointer" : ""
        }`}
        onClick={!isMobile ? handleClick : undefined}
      >
        <span className="font-bold text-lg dark:text-white">
          {data.title} ({data.itemCards.length})
        </span>
        {/* Toggle arrow only for desktop */}
        {!isMobile && (
          <span className="text-xl dark:text-white">
            {showItems ? "▲" : "▼"}
          </span>
        )}
      </div>

      {/* Item List */}
      {(isMobile || showItems) && <Itemlist items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategories;
