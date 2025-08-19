import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantMenu() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=13.3730376&lng=74.7071271&carousel=true&third_party_vendor=1"
        );

        const data = res.data?.data?.cards || [];

        // ✅ Case 1: Restaurant List Page
        let restList =
          data.find(
            (c) =>
              c?.card?.card?.gridElements?.infoWithStyle?.restaurants
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        // ✅ Case 2: Restaurant Menu Page (Categories)
        let itemCategories = data
          .map((c) => c?.groupedCard?.cardGroupMap?.REGULAR?.cards)
          .flat()
          .filter((c) => c?.card?.card?.["@type"]?.includes("ItemCategory"));

        setRestaurants(restList);
        setCategories(itemCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Swiggy data", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
      {/* ✅ Restaurant List */}
      {restaurants.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3">🍴 Restaurants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {restaurants.map((r) => (
              <div
                key={r.info.id}
                className="p-4 border rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold">{r.info.name}</h3>
                <p className="text-sm text-gray-600">{r.info.cuisines?.join(", ")}</p>
                <p className="text-sm">⭐ {r.info.avgRatingString}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Restaurant Menu */}
      {categories.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">📋 Menu Categories</h2>
          {categories.map((cat, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-semibold">{cat.card.card.title}</h3>
              <ul className="list-disc pl-5">
                {cat.card.card.itemCards?.map((item) => (
                  <li key={item.card.info.id}>
                    {item.card.info.name} - ₹{item.card.info.price / 100}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
