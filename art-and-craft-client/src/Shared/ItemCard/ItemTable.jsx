import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const ItemTable = ({ craft, index }) => {
    const routeLocation = useLocation();
    const navigate = useNavigate();

    const { _id,image, item_name, subcategory_Name,stockStatus, price,customization, processing_time, rating } = craft;

    console.log(location);

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/delCraft/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The place has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // navigate('/crafts')
                                    navigate(routeLocation?.pathname ? routeLocation.pathname : '/crafts')
                                }
                            });

                        }
                    })
            }
        });

    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td><img src={image} alt='User' className='rounded-full mr-2' /></td>
            <td>{item_name}</td>
            <td>{subcategory_Name}</td>
            <td>{rating}</td>
            <td>{price}</td>
            <td>{customization}</td>
            <td>{stockStatus}</td>
            
            <td>
              
                <Link className="btn btn-xs btn-warning" to={`/update/${_id}`}>Update</Link>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-xs btn-error">Delete</button>
            </td>
        </tr>
    );
};


ItemTable.propTypes = {
    craft: PropTypes.object,
    index: PropTypes.number,
}

export default ItemTable;