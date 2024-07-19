import { Navigate,Outlet } from "react-router-dom";
const AdminRoute = ()=>{
    const role= localStorage.getItem("role")
    return role==="1"? <Outlet /> : <Navigate to="/home" />
}
export default AdminRoute