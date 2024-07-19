import React,{useEffect, useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Profile() {
  const token = localStorage.getItem("token")

  const config = {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  const id = localStorage.getItem("id")
  const navigate = useNavigate()
  const [input,setInput] = useState({
    name:"",
    email:"",
    address:"",
    password:"",
    phone:"",
    answer:""
  })
  const getAllValues = async()=>{
    const result = await axios.get(`http://localhost:8080/api/auth/getUser/${id}`)
    if (result.data.success) {
    setInput(result.data.msg)
     
      } else {
        alert(result.data.msg);
      }
}
  useEffect(()=>{
getAllValues()
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const result = await axios.put(`http://localhost:8080/api/auth/update-user/${id}`,input,config)
    if(result.data.success){
      alert(result.data.msg)
    } else{
      alert(result.data.msg)
    }
  }
  return (
    <div className="container mt-5">
    <h1 className="mb-4">Update Profile</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={input.name}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={input.email}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={input.address}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={input.password}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={input.phone}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">Your favorite sports (Security Purpose)</label>
        <input
          type="text"
          className="form-control"
          id="answer"
          name="answer"
          value={input.answer}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Data</button>

    </form>
  </div>
  )
}

export default Profile