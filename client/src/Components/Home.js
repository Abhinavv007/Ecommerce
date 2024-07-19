import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { add } from '../redux/CartSlice';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  const [allProducts, setAllProducts] = useState([]);
  const[page,setPage] = useState(1)
  const [categories, setCategories] = useState([]);
  const [search,setSearch] = useState()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getAllProducts = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/product/pagination?currentPage=${page}`,config);
      if (result.data.success) {
        setAllProducts(result.data.msg);
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

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

  useEffect(()=>{
    getAllProducts();
  },[page])
  useEffect(() => {
    getAllCategories();
   
  }, []);

  const handleSearch = async(e)=>{
    e.preventDefault()
    const result = await axios.get(`http://localhost:8080/api/product/search?search=${search}`,config)
    if(result.data.success){
      setAllProducts(result.data.msg)
    } else{
      alert(result.data.msg)
    }
  }
const handleRadio = async(id)=>{
  const result = await axios.get(`http://localhost:8080/api/product/filter-cat?category=${id}`,config)
  if(result.data.success){
    setAllProducts(result.data.msg)
  } else{
    alert(result.data.msg)
  }
}
const handleNext = ()=>{
  setPage(page=>page+1)

}
const handlePrev = ()=>{
  setPage(page=>page-1)

}

const handleAdd = (product)=>{
  alert("Added to Cart")
  dispatch(add(product))
}


  return (
    <>
    
      <Header />
      <div style={{display:"flex",justifyContent:"center"}}>
      <input onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='Search here..' />
      <button onClick={handleSearch}>search</button>
      <button style={{marginLeft:2}} onClick={()=>window.location.reload()}>Reset Search</button>
  

      </div>
     
      <div className="home-container">
       
        <div className="sidebar">
          
          <h3>Categories</h3>
         
          {categories && categories.map((item) => (
            <div key={item._id}>
             
              <input
              name='radio'
                 value={item._id}
                 id={item._id}
                 type="radio"
             
             onChange={()=>handleRadio(item._id)}
              />
               <label style={{marginLeft:3}}>{item.name}</label>
            </div>
          ))}
          <button onClick={()=>window.location.reload()} style={{marginTop:5}}>Reset Filters</button>
        </div>

        <div className="product-list">
          {allProducts && allProducts.map((item) => (
            <div key={item._id} className="product-card">
              <img src={`http://localhost:8080/${item.photo}`} alt={item.name} className="product-image" />
              <h3>{item.name}</h3>
              <p>{item.description.slice(0,25)}...</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Shipping:</strong> {item.shipping ? "Yes" : "No"}</p>
              <div className="product-actions">
                <button onClick={()=>handleAdd(item)} className="add-to-cart">Add to Cart</button>
                <button className="more-details">More Details</button>
              </div>
            </div>
          ))}
        </div>
      
      
      </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button style={{marginRight:3}} onClick={handleNext}>Next</button>
        {page>=2? 
        <button onClick={handlePrev}>Prev</button>

         : null}
        </div>
    
    </>
  );
}

export default Home;
