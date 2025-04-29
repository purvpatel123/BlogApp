import React, { useContext, createContext, useEffect, useState } from 'react'
import axios from "axios";
import Cookie from 'js-cookie'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([])
    const [profile, setProfile] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const token = Cookie.get('token')
                const parsedToken = token ? JSON.parse(token) : undefined
                const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {

                    withCredentials: true,                // ✅ Include credentials if needed
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                console.log(data)
                setProfile(data)
                setIsAuthenticated(true)
            } catch (error) {
                console.log(error);

            }
        }
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
        };
        fetchBlogs()
        fetchProfile()
    }, [])
    return (
        <AuthContext.Provider value={{ blogs, profile,setProfile, isAuthenticated ,setIsAuthenticated}}>{children}</AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext)

export default AuthProvider;


