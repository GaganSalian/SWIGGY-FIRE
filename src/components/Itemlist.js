import React, { useState } from "react";
import { CDN_URL } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice.js";

const Itemlist = ({ items }) => {
  const dispatch = useDispatch();
  const [clickedItemId, setClickedItemId] = useState(null); // Tracks the last clicked item ID

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    setClickedItemId(item.card.info.id); // Set the clicked item ID
    setTimeout(() => setClickedItemId(null), 500); // Reset after 1 second
  };

  return (
    <div>
      <div>
        {items.map((item) => (
          <div
            key={item.card.info.id}
            className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
          >
            <div className="p-2 flex flex-col py-2">
              <div className="flex flex-col">
                <span className="font-bold text-gray-600 ">
                  {item.card.info.name}
                </span>
                <span className="font-bold">
                  ₹{" "}
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs pt-3">{item.card.info.description}</p>
            </div>
            <div className="relative">
              <img
                src={CDN_URL + item.card.info.imageId}
                alt="listImage"
                className="w-32 h-24 rounded-lg object-cover min-w-32 min-h-24"
              />
              <button
                className={`p-2 pt-0 px-3 ml-9 rounded-lg ${
                  clickedItemId === item.card.info.id
                    ? "bg-green-500 text-white"
                    : "bg-white text-green-500"
                } font-bold shadow-lg absolute top-[80px] text-center`}
                onClick={() => handleAddItem(item)}
              >
                {clickedItemId === item.card.info.id ? "✔ " : "ADD"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemlist;
