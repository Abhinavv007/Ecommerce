import { Navigate,Outlet } from "react-router-dom";
const PrivateRoute = ()=>{
    const auth = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    if(auth && role=="0"){
        return <Outlet />
    } else{
       return <Navigate to="/login" />
    }

}
export default PrivateRoute