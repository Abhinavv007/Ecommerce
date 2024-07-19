import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllProducts() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const [allProducts, setAllProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/product/get-products");
            if (result.data.success) {
                setAllProducts(result.data.msg);
                console.log(result.data.msg);
            } else {
                alert(result.data.msg);
            }
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleDelete = async(id)=>{
        try {
            const result = await axios.delete(`http://localhost:8080/api/product/delete-product/${id}`,config)
            if (result.data.success) {
                alert(result.data.msg);
              getAllProducts()
            } else {
                alert(result.data.msg);
            }

        } catch (error) {
            alert(error.message)
        }
    }

    const handleEdit = async(id)=>{
        navigate(`/edit-product/${id}`)
    }
    return (
        <div style={{ display: "flex" }}>
            <AdminMenu />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                {allProducts && allProducts.map((item) => (
                    <div key={item._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px', paddingBottom: '20px' }}>
                        <img src={`http://localhost:8080/${item.photo}`} alt={item.name} style={{ width: '200px', height: 'auto' }} />
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Price:</strong> ₹{item.price}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Shipping:</strong> {item.shipping ? "Yes" : "No"}</p>
                        <button onClick={()=>handleEdit(item._id)}>Edit</button>
                        <button onClick={()=>handleDelete(item._id)} style={{marginLeft:5}}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
