import { LOGO_URL } from "../utils/constant.js";
import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import { useSelector } from "react-redux";

 const Header=()=>{

  const [btnName,setbtnName]=useState("login");
  // let btnName="login";

  const onlineStatus=useOnlineStatus();
  const {loggedInUser}=useContext(UserContext);
  console.log(loggedInUser)

  //Subscribing to the store using selector
  const cartItems=useSelector((store)=>store.cart.items)
  console.log(cartItems)
    return(
      <div className="header flex justify-between m-10 border border-solid  pl-5 pr-5 pt-2 pb-2 shadow-lg rounded-lg bg-orange-100 mb-6">
            <div className="logo-container">
                <img className="logo w-20" src={LOGO_URL}/>
            </div> 
            <div className="nav-items pt-2">
                <ul className="flex">
                <li className="p-4">Online:{onlineStatus?"🟢":"🔴"}</li>
                  <li className="p-4"><Link to="/">Home</Link></li>
                  <li className="p-4"><Link to="/about">About</Link></li>
                  <li className="p-4"><Link to="/contact">Contact</Link></li>
                  <li className="p-4"><Link to="/grocery">Grocery</Link></li>
                  <li className="p-4"><Link to="/cart">Cart({cartItems.length} items)</Link></li>
                  <li className="p-4">{loggedInUser ? loggedInUser.name : "Guest"}</li>
                  <button className={`login px-4 py-0 h-8 mt-3 rounded ${
    btnName === "login" ? "bg-red-500 text-white" : "bg-green-500 text-white"
  }`} onClick={()=>{
                   btnName==="login"? setbtnName("logout"):setbtnName("login")
                   
                  }}>{btnName}</button>
                </ul>
            </div>     
      
      </div>
    )
  }

  
  export default Header;