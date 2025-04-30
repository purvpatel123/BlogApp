// import React from "react";
// import { useAuth } from "../context/AuthProvider";

// function MyProfile() {
//   const { profile} = useAuth();
//   console.log(profile?.photo)
//   console.log(profile?.photo?.url);
//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
//           <div className="relative">
//             <img
//               src={profile?.photo?.url}
//               alt="avatar"
//               className="w-full h-48 object-cover"
//             />
//             <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
//               <img
//                 src={profile?.photo?.url}
//                 alt="avatar"
//                 className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
//               />
//             </div>
//           </div>
//           <div className="px-6 py-8 mt-2">
//             <h2 className="text-center text-2xl font-semibold text-gray-800">
//               {profile?.name}
//             </h2>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.email}
//             </p>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.phone}
//             </p>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.role}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!profile) return <div className="text-center mt-10">No profile data found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        <div className="relative">
          <img
            src={profile?.photo?.url}
            alt="cover"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img
              src={profile?.photo?.url}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
            />
          </div>
        </div>
        <div className="px-6 py-8 mt-2">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            {profile?.name}
          </h2>
          <p className="text-center text-gray-600 mt-2">{profile?.email}</p>
          <p className="text-center text-gray-600 mt-2">{profile?.phone}</p>
          <p className="text-center text-gray-600 mt-2 capitalize">{profile?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
