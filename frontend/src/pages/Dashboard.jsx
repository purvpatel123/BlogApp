import React, { use } from 'react'
import { useAuth } from '../context/AuthProvider'
const Dashboard = () => {
  const {profile,isAuthenticated}=useAuth()
  console.log(profile)
  console.log(isAuthenticated)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard