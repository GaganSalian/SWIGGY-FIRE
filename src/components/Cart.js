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
          >
            Proceed to Pay ₹{totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
