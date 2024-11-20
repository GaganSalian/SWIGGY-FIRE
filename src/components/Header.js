import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";

 const Header=()=>{

  const [btnName,setbtnName]=useState("login");
  // let btnName="login";

    return(
      <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}/>
            </div> 
            <div className="nav-items">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li>Cart</li>
                  <button className="login" onClick={()=>{
                   btnName==="login"? setbtnName("logout"):setbtnName("login")
                   
                  }}>{btnName}</button>
                </ul>
            </div>     
      
      </div>
    )
  }

  
  export default Header;