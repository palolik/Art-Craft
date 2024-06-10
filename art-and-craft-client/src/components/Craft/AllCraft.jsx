import { useLoaderData } from "react-router-dom";
import ItemCard from "../../Shared/ItemCard/ItemCard";
import { useEffect, useState } from "react";

const AllCraft = () => {

    useEffect(()=>{
        document.title = "All Arts"
    },[])
    const loaderCrafts = useLoaderData();
    const [crafts, setCrafts] = useState(loaderCrafts);

    const handleSortA = ()=>{
        fetch('http://localhost:5000/allCrafts/a')
        .then(res=> res.json())
        .then(data=>setCrafts(data));
    }

    const handleSortD = ()=>{
        fetch('http://localhost:5000/allCrafts/d')
        .then(res=> res.json())
        .then(data=>setCrafts(data));
    }

    // console.log(crafts.length);
    return (
        <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3 items-center mb-5">
                <h1 className="font-bold text-6xl">All Beautiful Places</h1>
                <div>
                    <details className="dropdown">
                        <summary className="m-1 btn text-2xl">Sort by Average Price</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSortA}>Low To High</button></li>
                            <li><button onClick={handleSortD}>High To Low</button></li>
                        </ul>
                    </details>
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 shadow-2xl">
                {
                    crafts.map(craft => <ItemCard key={craft._id} craft={craft}></ItemCard>)
                }
            </div>
        </div>
    );
};

export default AllCraft;