import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

export default function RestaurantMenu() {
  const { resId } = useParams();
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resId}`
      );
      const json = await response.json();

      // ✅ Detect if it's mobile or desktop
      let info, itemCards;
      if (json?.data?.cards?.[0]?.card?.card?.info) {
        // Mobile JSON structure
        info = json.data.cards[0].card.card.info;
        itemCards =
          json.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
            (c) => c.card?.card?.itemCards
          )?.card.card.itemCards;
      } else {
        // Desktop JSON structure → keep your old hardcoded path
        info = json?.data?.cards?.[2]?.card?.card?.info;
        itemCards =
          json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards;
      }

      setMenuData({ info, itemCards });
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  if (!menuData) return <Shimmer />;

  const { info, itemCards } = menuData;

  return (
    <div className="menu">
      <h1>{info?.name}</h1>
      <p>
        {info?.cuisines?.join(", ")} – {info?.costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} – ₹{item.card.info.price / 100 ||
              item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
}
