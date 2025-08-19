import React, { useState } from "react";
import Itemlist from "./Itemlist.js";
import { ChevronDown, ChevronUp } from "lucide-react"; // better icons

const RestaurantCategories = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-11/12 sm:w-8/12 mx-auto my-4">
      <div className="bg-white shadow-md rounded-2xl p-4 transition-all duration-300 hover:shadow-lg">
        {/* Header */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-semibold text-lg sm:text-xl text-gray-800">
            {data.title} <span className="text-gray-500">({data.itemCards.length})</span>
          </span>
          {showItems ? (
            <ChevronUp className="w-5 h-5 text-gray-600 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 transition-transform" />
          )}
        </div>

        {/* Items list */}
        {showItems && (
          <div className="mt-3 border-t border-gray-200 pt-3 animate-fadeIn">
            <Itemlist items={data.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategories;
