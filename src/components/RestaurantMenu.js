import React, { useEffect, useState } from "react";

export default function RestaurantMenu() {
  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // ✅ Fetch all restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("/api/restaurants"); // adjust to your backend endpoint
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // ✅ Fetch menu when restaurant is selected
  useEffect(() => {
    if (!selectedRestaurant) return;
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/restaurants/${selectedRestaurant}/menu`);
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMenu();
  }, [selectedRestaurant]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4">
      {!selectedRestaurant ? (
        <>
          <h1 className="text-xl font-bold mb-4">Restaurants</h1>
          <ul className="space-y-2">
            {restaurants.map((r) => (
              <li
                key={r.id}
                className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedRestaurant(r.id)}
              >
                {r.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setSelectedRestaurant(null)}
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold mb-4">Menu</h1>
          {menu.length > 0 ? (
            <ul className="space-y-2">
              {menu.map((item, i) => (
                <li key={i} className="p-3 bg-gray-100 rounded">
                  <strong>{item.name}</strong> – ₹{item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found.</p>
          )}
        </>
      )}
    </div>
  );
}
