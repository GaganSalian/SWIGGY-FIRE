import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Itemlist from "./Itemlist";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.card.info.price || item.card.info.defaultPrice) / 100;
  }, 0);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePayment = () => {
    // Call your backend to create an order
    fetch("https://swiggy-fire-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount * 100, // Razorpay requires amount in paise (1 INR = 100 paise)
        currency: "INR",
        receipt: "order_rcptid_11",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Initialize Razorpay with the response from the backend
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY, // Access Razorpay key from .env
          amount: data.amount_due, // Amount in paise (e.g., ₹500 = 50000 paise)
          currency: data.currency,
          order_id: data.id, // Razorpay order ID
          name: "Your App Name", // Company/Brand Name
          description: "Payment for Order",
          image: "https://your-logo-url.com/logo.png",
          handler: function (response) {
            // Handle successful payment
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
      })
      .catch((err) => {
        console.error("Error in creating order: ", err);
      });
  };

  return (
    <div className="m-10 text-center dark:bg-gray-800 dark:text-white">
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
