import { CDN_URL } from "../utils/constant";


const RestaurantCard=(props)=>{
    const {resData}=props;
    const {cloudinaryImageId,name,avgRating,costForTwo,cuisines,areaName}=resData?.info;
    return(
      <div className="res-card">
        
         <img className="res-logo" alt="food-img" src={CDN_URL+cloudinaryImageId}/>
        
         
         <h3 className="res-detail">{name}</h3>
         <h4 className="res-details">{avgRating}</h4>
         <h4 className="res-details">{costForTwo}</h4>
         <h4 className="res-detailse">{cuisines.join(", ")} </h4>
         <h4 className="res-detailses">{areaName}</h4>
         
         
      </div>
    )
  
  }

  export default RestaurantCard;