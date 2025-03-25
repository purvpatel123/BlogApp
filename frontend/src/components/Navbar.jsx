import React from 'react'
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
function Navbar() {
  const {blogs}=useAuth()
  console.log(blogs)
  return (
   <>
   <nav>
    <div className='flex justify-between container mx-auto'>
      <div className='font-semibold text-xl'>Cilli<span className='text-blue-500'>Blog</span></div>
      <div>
        <ul className='flex space-x-6'>
          <Link to="/">HOME</Link>
          <Link to="/blogs">BLOGS</Link>
          <Link to="/creators">CREATORS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          
        </ul>
      </div>
      <div className='space-x-2'>
        <Link to ="/dashboard">DASHBOARD</Link>
         <Link to ="/login">LOGIN</Link>
      </div>
    </div>
   </nav>
   </>
  )
}

export default Navbar