import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';


const UpdateCraft = () => {

    useEffect(()=>{
        document.title = "Update Arts"
    },[]);
    const place = useLoaderData();
    
    const { _id, item_name, subcategory_Name, price, image, rating, customization, shortDescription, stockStatus, processing_time, userName, userEmail } = place;

    const handleUpdateCraft = (event) => {
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
            image, item_name, subcategory_Name, rating, shortDescription, price, customization, processing_time, stockStatus,userEmail,userName}

        fetch(`http://localhost:5000/craft/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(craftData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.matchedCount>0) {
                    Swal.fire({
                        title: 'Updating A Tourist Craft',
                        text: 'Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleUpdateCraft} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col lg:flex-row gap-3 h-full">
                    <h1 className="rounded-t-full lg:rounded-l-full shadow-2xl p-5 bg-yellow-300 text-5xl font-black text-center min-h-full">
                        <span className="">YES!</span><br />
                        <span>You Can</span><br />
                        <span>Update This Tourist Craft</span><br />
                    </h1>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                            Image Url
                            <input type="text" name="image" className="grow" defaultValue={image} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Craft Name
                            <input type="text" name="item_name" className="grow" defaultValue={item_name} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            Category
                            <input type="text" name="subcategory_Name" className="grow" defaultValue={subcategory_Name} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            Rating
                            <input type="text" name="rating" className="grow" defaultValue={rating} />
                        </label>
                        <textarea name="shortDescription" className="textarea textarea-bordered" defaultValue={shortDescription} ></textarea>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">

                        <label className="input input-bordered flex items-center gap-2">
Price                            <input type="text" name="price" className="grow" defaultValue={price} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                        Customization
                            <input type="text" name="customization" className="grow" defaultValue={customization} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                        Processing Time
                            <input type="text" name="processing_time" className="grow" defaultValue={processing_time} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                        Stock Status
                            <input type="text" name="stockStatus" className="grow" defaultValue={stockStatus} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2" >
                            Email
                            <input type="email" name="userEmail" className="grow" defaultValue={userEmail} disabled/>
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            User name
                            <input type="text" name="userName" className="grow" defaultValue={userName} disabled/>
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Update Craft" className="btn btn-warning w-full" />
                </div>
            </form>
        </div>
    );
};

export default UpdateCraft;