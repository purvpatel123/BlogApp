import { BACKEND_URL } from "../utils";
import React, { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null);
  const [profile, setProfile] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // <-- loading state added

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // You can optionally check token existence from cookies here if you want
        const token = Cookie.get("token");
        // console.log("token:", token);

        const { data } = await axios.get(`${BACKEND_URL}/api/users/my-profile`, {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        });
        setProfile(data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setProfile([]);
      } finally {
        setLoading(false); // <-- loading finished after fetchProfile completes
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`, {
          withCredentials: true,
        });
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ blogs, profile, setProfile, isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
