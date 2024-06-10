import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';

const AddCraft = () => {

    useEffect(()=>{
        document.title = "Add New!"
    },[]);
    
    const { user } = useContext(AuthContext);
    console.log(user);
    const handleAddCraft = (event) => {
        event.preventDefault();

        const form = event.target;
        const image = form.image.value;
        const item_name = form.item_name.value;
        const subcategory_Name = form.subcategory_Name.value;
        const rating = form.rating.value;
        const shortDescription = form.shortDescription.value;
        const price = form.price.value;
        const customization = form.customization.value;
        const processing_time = form.processing_time.value;
        const stockStatus = form.stockStatus.value;
        const userEmail = form.userEmail.value;
        const userName = form.userName.value;

        const craftData = {
            image: image,
            item_name: item_name,
            subcategory_Name: subcategory_Name,
            rating: rating,
            shortDescription: shortDescription,
            price: parseInt(price),
            customization: customization,
            processing_time: processing_time,
            stockStatus: stockStatus,
            userEmail: userEmail,
            userName: userName,
        }

        fetch('http://localhost:5000/addCraft', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(craftData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "New Art Added!",
                        text: "You have successfully added a new Art",
                        icon: "success"
                    });
                    form.reset();
                }
                console.log(data);
            })
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-black text-3xl shadow-2xl bg-red-900 p-5  w-full text-center text-white">List A New Art</h1>
            <form onSubmit={handleAddCraft} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col lg:flex-row gap-3 h-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                            Image Url
                            <input type="text" name="image" className="grow" placeholder="enter image url" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                          Craft Name
                            <input type="text" name="item_name" className="grow" placeholder="craft name" />
                        </label>

                   
                        <label className="input input-bordered flex items-center gap-2">
                        Category Name
                        <select name="subcategory_Name" className="grow">
                            <option value="">Select a Category</option>
                         
                            <option value="Landscape Painting">Landscape Painting</option>
                            <option value="Watercolour Painting">Watercolour Painting</option>
                            <option value="Oil Painting">Oil Painting</option>
                            <option value="Charcoal Sketching">Charcoal Sketching</option>
                            <option value="Cartoon Drawing">Cartoon Drawing</option>
                            
                        </select>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Rating
                           
                            <select name="rating" className="grow">
                            <option value="">enter rating</option>
                         
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            
                        </select>
                        </label>
                        <textarea name="shortDescription" className="textarea textarea-bordered" placeholder="Short Description"></textarea>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">

                        <label className="input input-bordered flex items-center gap-2">
                           Price
                            <input type="number" name="price" className="grow" placeholder="enter price" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                        Customization
                            
                            <select name="customization" className="grow">
                            <option value="">customization</option>
                         
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                          
                        </select>
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                        Processing time
                            <input type="text" name="processing_time" className="grow" placeholder="enter processing_time" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                         StockStatus
                       
                            <select name="stockStatus" className="grow">
                            <option value="">stock Status</option>
                         
                            <option value="In stock">In stock</option>
                            <option value="Made to Order">Made to Order</option>
                          
                        </select>
                        </label>

                        <label className="input input-bordered flex items-center gap-2" >
                            Email
                            <input type="email" name="userEmail" className="grow" defaultValue={user.email ? user.email : ''} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            User name
                            <input type="text" name="userName" className="grow" defaultValue={user.email ? user.displayName : ''} />
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Add New Craft" className="btn bg-green-500 text-white w-full" />
                </div>
            </form>
        </div>
    );
};

export default AddCraft;