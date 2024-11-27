import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body=()=>{

  const [listOfRestaurent,setlistOfRestaurent]=useState([]);

  const [filterdRestaurent,setfilterdRestaurent]=useState([]);

  const [searchText,setsearchText]=useState("");
  // console.log(listOfRestaurent)

  useEffect(()=>{
    fetchData();
  },[])

const fetchData= async ()=>{
  const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.3730376&lng=74.7071271&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json=await data.json();
  // console.log(json)
  setlistOfRestaurent(json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
  setfilterdRestaurent(json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
}

const onlineStatus=useOnlineStatus();
if (onlineStatus=== false) return <h1>loooks like u r offline</h1>;
console.log("body render");

if(listOfRestaurent.length===0){
  return (
    <div>
  <Shimmer/>
   </div>
)
 }

return(
      <div className="body ">
              <div className="filter flex">
                <div className="search m-3 p-4  ">
                    <input type="text" className="search-box border border-solid border-black rounded-sm ml-20" value={searchText} 
                    onChange={(e)=>{
                        setsearchText(e.target.value)
                        console.log("body render")
                    }} />
                    <button className="ml-4 bg-red-500 p-1 rounded-md text-white align-middle transform hover:scale-105 hover:z-10 transition-all" onClick={()=>{
                         const filterdRestaurent= listOfRestaurent.filter(
                          (res)=>res.info?.name.toLowerCase().includes(searchText.toLowerCase()));
                          setfilterdRestaurent(filterdRestaurent);
                    }}>Search</button>
                </div>

                    <button className="filter-btn bg-red-500 p-1 h-9 mt-6 rounded-md text-white align-middle transform hover:scale-105 hover:z-10 transition-all" 
                    onMouseOver={()=>{console.log("button clicked")}}
                    onClick={()=>{
                      // filter logic
                    const filterdList=listOfRestaurent.filter((res)=>res.info?.avgRating > 4.5);
                      
                    setfilterdRestaurent(filterdList);
                    }}
                    
                    >Top Rated Restaurant</button>
              </div>
              <div className="res-container flex flex-wrap justify-around m-12 mt-0 overflow-hidden  ">
             {
              filterdRestaurent.map((restaurant)=>(
                <Link key={restaurant.info.id}  to={"/restaurants/"+restaurant.info.id}><RestaurantCard  resData={restaurant}/></Link>))
              }
                 </div>
      </div>
    )
  }

  
  export default Body;