import React, { useState } from "react";
import { CDN_URL } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice.js";

const Itemlist = ({ items }) => {
  const dispatch = useDispatch();
  const [clickedItemId, setClickedItemId] = useState(null);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    setClickedItemId(item.card.info.id);
    setTimeout(() => setClickedItemId(null), 500);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-4 border rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-700"
        >
          {/* Text Section */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {item.card.info.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {item.card.info.description}
            </p>
            <span className="block mt-2 font-bold text-green-600 dark:text-green-400">
              ₹{" "}
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </span>
          </div>

          {/* Image + Button */}
          <div className="flex flex-col items-center md:items-end">
            {item.card.info.imageId && (
              <img
                src={CDN_URL + item.card.info.imageId}
                alt="listImage"
                className="w-32 h-24 rounded-lg object-cover"
              />
            )}
            <button
              className={`mt-2 px-4 py-1 rounded-lg font-bold shadow-md transition-all ${
                clickedItemId === item.card.info.id
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-600 border border-green-600"
              }`}
              onClick={() => handleAddItem(item)}
            >
              {clickedItemId === item.card.info.id ? "✔ Added" : "ADD"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itemlist;
