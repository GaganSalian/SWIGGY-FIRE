import React, { useEffect, useState } from "react";

export default function RestaurantMenu({ restaurantId }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/restaurants/${restaurantId}/menu`);
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        setMenu(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;
  if (menu.length === 0) return <p>No menu items available.</p>;

  return (
    <div className="menu-container">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">₹{item.price}</p>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
