import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const socket = io("https://swiggy-fire-backend.onrender.com");

const OrderTracker = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [status, setStatus] = useState("Order placed");

  useEffect(() => {
    // Join the order room
    socket.emit("joinOrderRoom", { orderId });

    // Listen for location updates
    socket.on("locationUpdate", (data) => {
      if (data.orderId === orderId) {
        setDriverLocation(data.driverLocation);
        setStatus(data.status);
      }
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, [orderId]);

  const mapContainerStyle = { width: "100%", height: "400px" };

  return (
    <div className="m-10 text-center">
      <h1 className="text-2xl font-bold">Order Tracker</h1>
      <p>Status: {status}</p>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverLocation}
          zoom={15}
        >
          <Marker position={driverLocation} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default OrderTracker;
