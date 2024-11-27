import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategories from "./RestaurantCategories.js";
import { useState } from "react";

const RestaurantMenu = () => {

  const { resId } = useParams();
  const resInfo=useRestaurantMenu(resId);
  const [showIndex,setShowIndex]=useState(null);

  if (!resInfo) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const {itemCards} =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards || [];

      const categories=resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>
        c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )|| [];
  return (
    <div className="menu m-10 text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category,index)=>
      (<RestaurantCategories key={category?.card?.card.title} 
      data={category?.card?.card}

        showItems={index === showIndex  }
        setShowIndex={()=>
        setShowIndex(index === showIndex ? null : index)}
      />
       ))}
    </div>
  );
};

export default RestaurantMenu;
