import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js"


const appStore=configureStore({
    reducer:{
        cart: cartReducer,  //this contain cartSlice reducer
    }
});

export default appStore;