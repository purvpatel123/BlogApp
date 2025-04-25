import React from 'react'
import { useAuth } from '../context/AuthProvider'
function Sidebar({setComponent}) {
    const { profile } = useAuth();
    console.log(profile)

    
    return (
        <div>
            <div>
                <img src={profile?.photo?.url} alt="" />
                <p>{profile?.name}</p>
            </div>
            <ul >
                <button className='w-full px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-300'>MY BLOGS</button>
         </ul>
         <ul >
                <button className='w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition duration-300'>CREATE BLOGS</button>
         </ul>
         <ul >
                <button className='w-full px-4 py-2 bg-pink-500 hover:bg-pink-700 transition duration-300'>MY PROFILE</button>
         </ul>
         <ul >
                <button className='w-full px-4 py-2 bg-red-500 hover:bg-red-700 transition duration-300'>HOME</button>
         </ul>
         <ul >
                <button className='w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-700 transition duration-300'>LOGOUT</button>
         </ul>
        </div>
    )
}

export default Sidebar