import { useEffect, useState } from 'react'
import axios from "axios"
import './List.css'

//toastify components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data);
        if (response.data.succes) {

            setList(response.data.data);

            toast.success(response.data.message);
        } else {
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        //console.log(foodId);
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();

        if (response.data.succes) {

            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])
    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>

            <div className='list-table'>

                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Description</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List