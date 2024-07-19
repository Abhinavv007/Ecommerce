import React from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useNavigate} from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    navigate("/login")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <RiShoppingCart2Fill /> 
    <Link className="navbar-brand" to="/"> 
    E-Commerce</Link>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2">
       
        <li className="nav-item">
          <Link className="nav-link active" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/cart">Cart</Link>
        </li>
    
      </ul>
      <form className="d-flex" role="search">
     {token? <button onClick={handleLogout}>Logout</button> :  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className="nav-link active" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">Login</Link>
        </li>

       </ul> }
       
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header