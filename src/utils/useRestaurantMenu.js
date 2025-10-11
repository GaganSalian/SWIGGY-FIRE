// import {useEffect,useState} from "react";
// import { MENU_API } from "../utils/constant.js";

// const useRestaurantMenu=(resId)=>{

//     const [resInfo, setResInfo] = useState(null);


//     useEffect(() => {
//         fetchMenu();
//       }, []);
    
//       const fetchMenu = async () => {
//         try {
//           const data = await fetch(
//             MENU_API(resId)
//           );
//           const json = await data.json();
//           console.log(json);
//           setResInfo(json.data);
//         } catch (error) {
//           console.error("Error fetching menu:", error);
//         }
//       };
    

//     return  resInfo;
// }

// export default useRestaurantMenu;

import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant.js";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return; // avoid fetching if no restaurant ID
    fetchMenu();
  }, [resId]); // run whenever resId changes

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API(resId));

      // Attempt to parse JSON safely
      let json = null;
      try {
        json = await response.json();
      } catch (parseError) {
        console.warn("Menu API did not return valid JSON:", parseError);
      }

      if (!json || !json.data) {
        console.error("No menu data available");
        setResInfo(null);
        return;
      }

      setResInfo(json.data); // set menu data
      console.log("Fetched menu:", json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setResInfo(null);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
