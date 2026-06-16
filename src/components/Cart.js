import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Itemlist from "./Itemlist";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.card.info.price || item.card.info.defaultPrice) / 100;
  }, 0);

  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const ensureRazorpayLoaded = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve();

      const existing = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existing) {
        if (existing.getAttribute("data-loaded") === "true") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Razorpay script failed to load")));
        return;
      }

      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      s.onload = () => {
        s.setAttribute("data-loaded", "true");
        resolve();
      };
      s.onerror = () => reject(new Error("Razorpay script failed to load"));
      document.body.appendChild(s);
    });
  };

  const handlePayment = async () => {
    if (isProcessing) return; // prevent duplicate calls
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    try {
      await ensureRazorpayLoaded();

      const response = await fetch("http://localhost:3001/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Razorpay requires amount in paise (1 INR = 100 paise)
          currency: "INR",
          receipt: "order_rcptid_11",
        }),
      });

      const data = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || window.RAZORPAY_KEY,
        amount: data.amount_due || data.amount || totalAmount * 100,
        currency: data.currency || "INR",
        order_id: data.id,
        name: "Your App Name",
        description: "Payment for Order",
        handler: function (response) {
          console.log("Payment successful: ", response);
          alert("Payment successful!");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error in creating order or loading Razorpay: ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="m-10 text-center dark:bg-gray-800 dark:text-white rounded-md">
      <h1 className="text-2xl font-bold">Cart</h1>
      <button
        className="p-2 m-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && (
        <h1 className="font-serif text-2xl">Your cart is empty</h1>
      )}

      <div className="w-6/12 m-auto">
        <Itemlist items={cartItems} />
        <div className="mt-4">
          <h2 className="font-bold text-lg w-6/12 m-auto">
            Total: ₹{totalAmount}
          </h2>

          <button
            className="p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
            onClick={handlePayment} // Trigger Razorpay payment
          >
            Proceed to Pay ₹{totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
