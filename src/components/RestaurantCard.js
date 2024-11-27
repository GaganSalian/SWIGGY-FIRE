import { CDN_URL } from "../utils/constant";

const RestaurantCard=(props)=>{
    const {resData}=props;
    const {cloudinaryImageId,name,avgRating,cuisines}=resData?.info;
    return(
      <div className="res-card m-4  w-[234px] h-[320px]   rounded-lg  object-cover transform hover:scale-95 hover:z-10 transition-all">
         <img className="res-logo   rounded-xl w-full h-[181.99px] object-cover " alt="food-img" src={CDN_URL+cloudinaryImageId}/>
         <h3 className="res-detail pt-4   font-bold cursor-pointer  font-basis-grotesque  text-[rgb(40, 44, 63)] text-md">{name}</h3>
         <h4 className="res-details text-[rgb(40, 44, 63)] font-basis-grotesque  text-md">⭐ {avgRating} <span className="ml-2">•  25:30 mins</span></h4>
         <h4 className="res-details   font-lato  pt-0 text-md">{cuisines.join(", ")}</h4>
         </div>
    )
  }

  export default RestaurantCard;