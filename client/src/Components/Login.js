import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [input,setInput] = useState({
   
    email:"",
   
    password:""
  
  })

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const result = await axios.post("http://localhost:8080/api/auth/login",input)
    if(result.data.success){
      localStorage.setItem("token",result.data.token)
      localStorage.setItem("name",result.data.name)
      localStorage.setItem("id",result.data.id)
      localStorage.setItem("role",result.data.role)
      if (result.data.role == "1") {
        navigate("/adminPanel");
      } else {
        navigate("/home");
      }
      alert(result.data.msg)
     
    } else{
      alert(result.data.msg)
    }
  }
  return (
    <div className="container mt-5">
    <h1 className="mb-4">Login</h1>
    <form onSubmit={handleSubmit}>
   
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
      
      <button type="submit" className="btn btn-primary">Login</button>
      <button style={{display:'block',marginTop:5}} onClick={()=>navigate("/forgot-password")} className="btn btn-primary">Forgot Password</button>
      <button style={{display:'block',marginTop:5}} onClick={()=>navigate("/signup")} className="btn btn-primary">Dont't have an account?</button>
    </form>
  </div>
  )
}

export default Login