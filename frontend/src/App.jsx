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
import Detail from './pages/Detail';
import Notfound from './pages/Notfound';
import { Navigate } from 'react-router-dom'
function App() {
  const location=useLocation() //useLocation() is a React Router hook used to access the current URL location object.
  const hideNavbarFooter=["/dashboard","/login","/register"]  
  .includes(location.pathname); //it match the current route to array containing route
  const {blogs,isAuthenticated}=useAuth();
  console.log(blogs)
  

  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}
      <Routes>
        <Route path='/' element={isAuthenticated===true?<Home/> : <Navigate to={"/login"}/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/creators' element={<Creators/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

        
        <Route path='/blog/update/:id' element={<UpdateBlog/>}/>
        <Route path='/blog/:id' element={<Detail/>}/>
        {/* universal route */}
        <Route path='*' element={<Notfound/>}/>
      </Routes>
     <Toaster/>
      {!hideNavbarFooter && <Footer/>}
      
    </div>
  )
}

export default App