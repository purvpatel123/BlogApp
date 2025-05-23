import React, { use } from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import MyBlogs from '../dashboard/MyBlogs'
import UpdateBlog from '../dashboard/UpdateBlog'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth()
  const [component, setComponent] = useState("My Blogs")
  console.log(profile);
  console.log(isAuthenticated);
  
  if(!isAuthenticated){
    return <Navigate to={"/"}/>;
  }
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component == "My Profile" ? (<MyProfile />)
          : component == "Create Blog" ? (<CreateBlog />)
            : component == "My Blogs" ? (<MyBlogs />)
              : (<UpdateBlog />)}
      </div>
    </div>
  )
}

export default Dashboard