
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils"; 
function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  console.log(profile);
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };
  
  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/logout`,  //api for logout
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-3 cursor-pointer hover:bg-gray-50 transition-all duration-200"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl text-gray-700" />
      </div>

      {/* Overlay for mobile */}
      {show && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-72 h-full shadow-2xl fixed top-0 left-0 bg-gradient-to-b from-slate-50 to-white backdrop-blur-sm transition-transform duration-300 transform sm:translate-x-0 z-50 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-xl text-gray-600" />
        </div>

        {/* Profile Section */}
        <div className="text-center pt-8 pb-6 border-b border-gray-200">
          <div className="relative inline-block">
            <img
              src={profile?.photo?.url || "https://via.placeholder.com/150/4F46E5/FFFFFF?text=" + (profile?.user?.name?.charAt(0) || "U")}
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto object-cover bg-gradient-to-br from-indigo-500 to-purple-600"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150/4F46E5/FFFFFF?text=" + (profile?.user?.name?.charAt(0) || "U");
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-1">
            {profile?.user?.name || "User"}
          </h3>
          <p className="text-gray-500 text-sm">Welcome back!</p>
        </div>

        {/* Navigation Menu */}
        <div className="px-6 py-6">
          <nav className="space-y-3">
            <button
              onClick={() => handleComponents("My Blogs")}
              className="w-full group flex items-center px-4 py-3 text-left bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold tracking-wide">📝 MY BLOGS</span>
            </button>

            <button
              onClick={() => handleComponents("Create Blog")}
              className="w-full group flex items-center px-4 py-3 text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold tracking-wide">✍️ CREATE BLOG</span>
            </button>

            <button
              onClick={() => handleComponents("My Profile")}
              className="w-full group flex items-center px-4 py-3 text-left bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold tracking-wide">👤 MY PROFILE</span>
            </button>

            <button
              onClick={gotoHome}
              className="w-full group flex items-center px-4 py-3 text-left bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold tracking-wide">🏠 HOME</span>
            </button>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-4 py-3 text-left bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="font-semibold tracking-wide">🚪 LOGOUT</span>
              </button>
            </div>
          </nav>
        </div>

        
        
      </div>
    </>
  );
}

export default Sidebar;