import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function ForgotPass() {
    const navigate = useNavigate()
    const [input,setInput] = useState({
   
        email:"",
       
        newPassword:"",
        answer:""
      
      })
      const handleSubmit = async(e)=>{
        e.preventDefault()
        const result = await axios.post("http://localhost:8080/api/auth/forgot-password",input)
        if(result.data.success){
            alert(result.data.msg)
            navigate("/login")
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
        <label htmlFor="newPassword" className="form-label">New Password</label>
        <input
          type="newPassword"
          className="form-control"
          id="newPassword"
          name="newPassword"
          value={input.newPassword}
          onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
          
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">Your favorite sports</label>
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
      
      <button type="submit" className="btn btn-primary">Change newPassword</button>
    </form>
  </div>
  )
}

export default ForgotPass