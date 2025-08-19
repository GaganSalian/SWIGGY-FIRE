import React, { useEffect, useState } from "react";

export default function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu"); // adjust endpoint
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="menu-container">
      <h1>Restaurant Menu</h1>
      {menu.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₹{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
