import { useEffect } from "react";
import {  useLoaderData, useNavigate } from "react-router-dom";


const ItemDetails = () => {

    useEffect(()=>{
        document.title = "Place Details"
    },[])
    const place = useLoaderData();
    const navigate = useNavigate();
    const {  item_name, subcategory_Name, price, image, rating, customization, shortDescription, stockStatus, processing_time, } = place;

    console.log('place: ',place);

    if(!place){
        navigate('/crafts');
    }

  

    return (
        <div>
        <div className="flex flex-col lg:flex-row  w-full   shadow-lg  rounded-xl ">
            <div className="w-full lg:w-1/2">
                <img src={image} alt="image" />
            </div>
            <div className="w-full lg:h-1/2 lg:w-1/2 flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{item_name}</h1>
                <p className="font-bold text-xl">{shortDescription}</p>
          
                    <span className="font-bold text-base flex flex-column gap-3">Rating: {rating}</span>
                    <span className="font-bold text-base flex flex-column gap-3">{subcategory_Name}</span>
             
         
               
                    <span className="font-bold text-base flex flex-column gap-3">Price: ${price}</span>
                    <span className="font-bold text-base flex flex-column gap-3">Customization: {customization}</span>
                    <span className="font-bold text-base flex flex-column gap-3">Processing Time:{processing_time}</span>
                
                <h4 className="font-bold text-xl flex flex-row gap-3">
                    <span>{stockStatus} </span>
                </h4>
              
            </div>
        </div>
        </div>
    );
};

export default ItemDetails;