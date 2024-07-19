import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminMenu() {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    navigate("/login")
  }
  return (
    <div className="vertical-navbar">
    <h3>Menu</h3>
    <ul className='menu'>
      <li>
        <Link to="/create-category">Create Category</Link>
      </li>
      <li>
        <Link to="/create-product">Create Product</Link>
      </li>
      <li>
        <Link to="/manage-users">Manage Users</Link>
      </li><li>
        <Link to="/all-products">All Products</Link>
      </li>
      <button onClick={handleLogout}>Log out</button>
    </ul>
  </div>
);
}
 

export default AdminMenu