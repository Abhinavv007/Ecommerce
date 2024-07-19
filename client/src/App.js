import './App.css';
import {BrowserRouter , Route, Routes} from "react-router-dom"
import Home from './Components/Home';
import Footer from './Components/Footer';
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import NotFound from './Components/NotFound';
import PrivateRoute from './Private/PrivateRoute';
import ForgotPass from './Components/ForgotPass';
import AdminRoute from './Private/AdminRoute';
import AdminPanel from './Admin/AdminPanel';
import EditProd from './Admin/EditProd';
import Dashboard from './User/Dashboard';
import Profile from './User/Profile';
import Orders from './User/Orders';
import Category from './Admin/Category';
import Product from './Admin/Product';
import ManageUsers from "./Admin/ManageUsers"
import Cart from "./Components/Cart"
import AllProducts from './Admin/AllProducts';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      
    <Route path='' element={<AdminRoute />}>
    <Route index element={<AdminPanel/>} />
    <Route path='/adminPanel' element={<AdminPanel />} />
    <Route path='/create-category' element={<Category />} />
    <Route path='/create-product' element={<Product />} />
    <Route path='/manage-users' element={<ManageUsers />} />
    <Route path='/all-products' element={<AllProducts />} />
    <Route path='/edit-product/:id' element={<EditProd />} />
    </Route>


      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />

      <Route path='' element={<PrivateRoute />}>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
