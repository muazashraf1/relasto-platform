// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axiosInstance";

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const { user, setUser, initialLoading } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   console.log(user);


//   const [formData, setFormData] = useState({
//     bio: "",
//     location: "",
//     phone: "",
//     address: "",
//   });

//   useEffect(() => {
//     if (initialLoading) {
//       return <p>Loading...</p>;
//     }

//     // if (!user) {
//     //   navigate("/login-page");
//     //   return;
//     // }

//     // Load initial profile data
//     const loadProfile = async () => {
//       try {
//         const response = await api.get("/accounts/profile/");
//         const profileData = response.data;

//         setFormData({
//           bio: profileData.bio || "",
//           location: profileData.location || "",
//           phone: profileData.phone || "",
//           address: profileData.address || "",
//         });
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       }
//     };

//     loadProfile();
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const response = await api.put("/accounts/profile/", formData);

//       setSuccess("Profile updated successfully!");

//       if (setUser) {
//         setUser((prev) => ({
//           ...prev,
//           phone: formData.phone,
//           address: formData.address,
//         }));
//       }

//       setTimeout(() => {
//         setSuccess("");
//       }, 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to update profile. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
//         <p className="text-base font-medium text-slate-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50">
//         <h2 className="text-3xl font-semibold text-slate-900 mb-3">My Profile</h2>
//         <p className="text-slate-600 mb-8">Update your personal information</p>

//         {error && (
//           <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 mb-5 text-sm text-red-700">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 mb-5 text-sm text-emerald-700">
//             {success}
//           </div>
//         )}

//         <div className="mb-8 border-b border-slate-200 pb-6">
//           <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Account Information</h3>
//           <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
//             <div>
//               <p className="text-slate-500 mb-1">Username</p>
//               <p className="font-semibold text-slate-900">{user?.username}</p>
//             </div>
//             <div>
//               <p className="text-slate-500 mb-1">Email</p>
//               <p className="font-semibold text-slate-900">{user?.email}</p>
//             </div>
//             <div className="sm:col-span-2">
//               <p className="text-slate-500 mb-1">Account Type</p>
//               <p className="font-semibold text-slate-900">{user?.is_agent ? "Agent" : "Regular User"}</p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               placeholder="Tell us about yourself..."
//               rows="3"
//               value={formData.bio}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             ></textarea>
//           </div>

//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">Location</label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               placeholder="e.g., Lahore, Pakistan"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             />
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="e.g., +92 300 1234567"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             />
//           </div>

//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">Address</label>
//             <textarea
//               id="address"
//               name="address"
//               placeholder="Full address..."
//               rows="2"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </form>

//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;




import React, { useState, useContext, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";
import { deleteProperty } from "../api/property";
import { VisitContext } from "../context/VisitContext";
import VisitRequestsCard from "../components/VisitRequestsCard";

const UserProfile = () => {
  const { slug } = useParams
  const navigate = useNavigate();
  const { user, setUser, initialLoading, loadUser } = useContext(AuthContext);
  // const { visitRequests } = useContext(VisitContext)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [properties, setProperties] = useState([])




  useEffect(() => {
    if (initialLoading) return;

    const loadProfile = async () => {
      try {
        const response = await api.get("/accounts/profile/");
        const profileData = response.data;
        // console.log(profileData.bio);
        // console.log(profileData);

        console.log(user);

        // setFormData({
        //   bio: profileData.bio || "",
        //   location: profileData.location || "",
        //   phone: profileData.phone || "",
        //   address: profileData.address || "",
        // });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, [user]);



  const singleFatching = async () => {
    try {
      const fetch = await api.get('/properties/my/')
      const res = fetch.data
      setProperties(res)
      console.log(res);

    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    singleFatching()
  }, [])




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        bio: user.bio,
        address: user.address,
        location: user.location,
        phone: user.phone
      })
    }
  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        user: {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        profile: {
          bio: formData.bio,
          location: formData.location,
        },
      };

      const res = await api.put("/accounts/profile/", payload);

      setSuccess("Profile updated successfully ✅");

      
      await loadUser();

      setIsModalOpen(false);

    } catch (err) {
      const errors = err.response?.data || {};

      const formattedError = Object.entries(errors)
        .map(([key, value]) =>
          Array.isArray(value) ? `${key}: ${value.join(", ")}` : `${key}: ${value}`
        )
        .join(", ");

      setError(formattedError || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (slug) => {
    try {
      const deleting = await deleteProperty(slug)
      singleFatching()

    } catch (error) {
      console.error(error)
    }
  }


  const requestFetching = async () => {
    const fetching = await api.get("/visits/my-request/")
    setRequest(fetching.data)
  }
  const [request, setRequest] = useState([])

  useEffect(() => {
    requestFetching()
  }, [])

  console.log(request);

  // loadUser()



  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="relative h-72 bg-slate-600">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70" />

        <div className="relative max-w-6xl mx-auto h-full flex items-end pb-6 px-4">
          <div className="flex items-end gap-6">

            <div className="h-28 w-28 rounded-full  flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              <img src="/Relasto design (1)/sad.jpg" className="h-full w-full rounded-full" alt="" />

            </div>

            <div className="text-white">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-slate-300">{user.email}</p>
              <p className="text-sm mt-1 text-slate-400">
                {user.is_agent ? "Agent Account" : "Regular User"}
              </p>
            </div>

          </div>
        </div>
      </div>





      {user.is_agent && (
        <div className="max-w-6xl mx-auto px-4 py-10">

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              My Properties
            </h2>

            <button
              onClick={() => navigate("/add-property")}
              className="flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-[#e55d00] hover:shadow-lg transition duration-200"
            >
              + Add Property
            </button>
          </div>

          {properties.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500">
              No property yet
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">

              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 bg-slate-200">
                    {property.primary_image ? (
                      <img
                        src={property.primary_image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-slate-900">
                      {property.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {property.city || property.address}
                    </p>

                    <p className="font-bold text-slate-900">
                      Rs {property.price}
                    </p>

                    <button
                      onClick={() => navigate(`/property/${property.slug}`)}
                      className="mt-3 cursor-pointer w-full bg-slate-900 text-white py-2 rounded-xl text-sm hover:bg-slate-800"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/edit-property/${property.slug}`)}
                      className="mt-3 cursor-pointer w-full bg-slate-900 text-white py-2 rounded-xl text-sm hover:bg-slate-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(`${property.slug}`)}
                      className="mt-3 cursor-pointer w-full bg-red-600 text-white py-2 rounded-xl text-sm hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      )}


      <div className="max-w-6xl  mx-auto px-4 mt-16 mb-10 relative z-10">
        <div className="bg-white rounded-3xl  shadow-xl border border-slate-400 p-6 md:p-8">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Profile Information
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Edit
            </button>
          </div>

          {/* CONTENT */}
          <div className="grid gap-6 sm:grid-cols-2">

            {/* NAME */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <p className="text-xs uppercase text-slate-500 font-semibold mb-1">
                Username
              </p>
              <p className="text-sm font-bold text-slate-900">
                {user.username}
              </p>
            </div>

            {/* EMAIL */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <p className="text-xs uppercase text-slate-500 font-semibold mb-1">
                Email
              </p>
              <p className="text-sm font-bold text-slate-900 break-all">
                {user.email}
              </p>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <p className="text-xs uppercase text-slate-500 font-semibold mb-1">
                Phone
              </p>
              <p className="text-sm font-bold text-slate-900">
                {user.phone || "Not provided"}
              </p>
            </div>

            {/* ADDRESS */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <p className="text-xs uppercase text-slate-500 font-semibold mb-1">
                Address
              </p>
              <p className="text-sm font-bold text-slate-900">
                {user.address || "Not provided"}
              </p>
            </div>

          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          {/* MODAL BOX */}
          <div className="w-full max-w-md max-h-[90vh] overflow-y-scroll bg-white rounded-3xl shadow-2xl p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Edit Profile
            </h2>


            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-sm text-slate-600">Bio</label>
                <input
                  type="text"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>


              <div>
                <label className="text-sm text-slate-600">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Phone</label>
                <input
                  type="number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>


              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                >
                  Save
                </button>

              </div>
            </form>
          </div>
        </div>
      )}


      <VisitRequestsCard />

    </div>







  );
};

export default UserProfile;
