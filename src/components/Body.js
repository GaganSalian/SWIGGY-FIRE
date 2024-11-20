import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body=()=>{

  const [listOfRestaurent,setlistOfRestaurent]=useState([]);

  const [filterdRestaurent,setfilterdRestaurent]=useState([]);

  const [searchText,setsearchText]=useState("")

  useEffect(()=>{
    fetchData();
  },[])

const fetchData= async ()=>{
  const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.3730376&lng=74.7071271&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json=await data.json();
  console.log(json)
  setlistOfRestaurent(json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
  setfilterdRestaurent(json?.data?.cards[1 || 2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
}

console.log("body render");



if(listOfRestaurent.length===0){
  return (
    <div>
  <Shimmer/>
   </div>
)
 }

return(
      <div className="body">
              <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} 
                    onChange={(e)=>{
                        setsearchText(e.target.value)
                        console.log("body render")
                    }} />
                    <button onClick={()=>{
                         const filterdRestaurent= listOfRestaurent.filter(
                          (res)=>res.info?.name.toLowerCase().includes(searchText.toLowerCase()));
                          setfilterdRestaurent(filterdRestaurent);
                    }}>Search</button>
                </div>

                    <button className="filter-btn" 
                    onMouseOver={()=>{console.log("button clicked")}}
                    onClick={()=>{
                      // filter logic
                    const filterdList=listOfRestaurent.filter((res)=>res.info?.avgRating > 4.5);
                      
                    setfilterdRestaurent(filterdList);
                    }}
                    
                    >Top Rated Restaurant</button>
              </div>
              <div className="res-container">
             {
              filterdRestaurent.map((restaurant)=>(
                <Link key={restaurant.info.id}  to={"/restaurants/"+restaurant.info.id}><RestaurantCard  resData={restaurant}/></Link>))
              }
                 </div>
      </div>
    )
  }

  
  export default Body;