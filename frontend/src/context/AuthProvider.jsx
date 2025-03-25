import React, { useContext, createContext, useEffect, useState } from 'react'
import axios from "axios";

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {   


                const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {

                    withCredentials: true                 // ✅ Include credentials if needed
                });
                console.log(data)
                setBlogs(data)
            } catch (error) {
                console.log(error);

            }
        }
        fetchBlogs()
    }, [])
    return (
        <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext)

export default AuthProvider;


