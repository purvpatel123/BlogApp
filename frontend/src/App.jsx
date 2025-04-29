import React from 'react'
import Navbar from "../src/components/Navbar"
import Home from "../src/components/Home"
import Footer from "../src/components/Footer"
import {Route,Routes, useLocation} from "react-router-dom"
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "../src/pages/Creators"
import {useAuth} from "./context/AuthProvider";
import {Toaster} from 'react-hot-toast';
import UpdateBlog from './dashboard/UpdateBlog'
function App() {
  const location=useLocation() //useLocation() is a React Router hook used to access the current URL location object.
  const hideNavbarFooter=["/dashboard","/login","/register"]  
  .includes(location.pathname); //it match the current route to array containing route
  const {blogs}=useAuth();
  console.log(blogs)
  

  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/creators' element={<Creators/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/blog/update/:id' element={<UpdateBlog/>}/>
      </Routes>
     <Toaster/>
      {!hideNavbarFooter && <Footer/>}
      
    </div>
  )
}

export default App