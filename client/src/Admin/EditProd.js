import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { useParams ,useNavigate} from "react-router-dom";

const Product = () => {
    const navigate = useNavigate()
    const {id} = useParams()
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    shipping: "",
  });

  const [photo, setPhoto] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getAllValues = async()=>{
        const result = await axios.get(`http://localhost:8080/api/product/get-product/${id}`)
        if (result.data.success) {
        setInput(result.data.msg)
        setPhoto(result.data.msg.photo)
         
          } else {
            alert(result.data.msg);
          }
  }
  useEffect(()=>{
   getAllValues()
  },[])


  const getAllCategories = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/category/getAllCategories', config);
      if (result.data.success) {
        setCategories(result.data.msg);
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      alert('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("quantity", input.quantity);
    formData.append("shipping", input.shipping);
   photo && formData.append("photo", photo);

    try {
      const result = await axios.put(`http://localhost:8080/api/product/edit-product/${id}`, formData, config);
      if (result.data.success) {
        alert(result.data.msg);
        
        navigate("/all-products")
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      console.error("There was an error creating the product!", error);
    }
  };

  return (
    <div className="product-container">
      <AdminMenu />
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={input.description}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={input.price}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={input.category}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories && categories.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={input.quantity}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <input
        
            type="file"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label>Shipping:</label>
          <select
            name="shipping"
            value={input.shipping}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          >
            <option value="">Select Shipping Option</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Save Product</button>
      </form>
    </div>
  );
};

export default Product;
