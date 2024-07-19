import React from 'react'
import { Link } from 'react-router-dom';


function UserMenu() {
  return (
    <div className="vertical-navbar">
    <h3>Menu</h3>
    <ul className='menu'>
      <li>
        <Link to="/profile">Update Profile</Link>
      </li>
      <li>
        <Link to="/orders">Orders</Link>
      </li>
     
    </ul>
  </div>
);
}
 

export default UserMenu