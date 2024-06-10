import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ItemCard = ({ craft }) => {

    const { _id, item_name,subcategory_Name, price, image, rating, customization, shortDescription, stockStatus, processing_time} = craft;

    console.log(craft);

    return (
        <div className="flex flex-col lg:flex-row w-full gap-5 p-5 shadow-lg my-4 rounded-xl">
            <div className="w-full lg:w-2/3">
                <img className="w-full h-full" src={image} alt="image" />
            </div>
            <div className="w-full lg:h-1/2 lg:w-1/3 flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{item_name}</h1>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span>Category: {subcategory_Name}</span>
                   
                </h4>
                <span className="font-semibold text-base flex flex-row gap-3">Rating: {rating}</span>
                <p className="font-bold text-base">{shortDescription}</p>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span className="font-semibold text-xl ">Price: {price}</span>
                    <span>Customization: {customization}</span>
                    <span>Time: {processing_time}</span>
                </h4>
                <h4 className="font-semibold text-xl flex flex-row gap-3">
                    <span>Stock Status: {stockStatus}</span>
                </h4>
                <Link to={`/craft/${_id}`} className="btn btn-primary bg-red-800 hover:bg-red-600 w-full">View Details</Link>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    craft: PropTypes.object,
}

export default ItemCard;