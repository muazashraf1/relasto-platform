// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createProperty } from "../../api/property";

// const AgentPropertyCreate = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     status: "sale",
//     type: "residential",
//     city: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     // Validation
//     if (
//       !formData.title ||
//       !formData.price ||
//       !formData.city ||
//       !formData.address
//     ) {
//       setError("Please fill in all required fields");
//       setLoading(false);
//       return;
//     }

//     if (formData.price < 0) {
//       setError("Price cannot be negative");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await createProperty({
//         ...formData,
//         price: parseInt(formData.price),
//       });

//       setSuccess("Property created successfully!");
//       setTimeout(() => {
//         navigate("/agent/properties");
//       }, 1500);
//     } catch (err) {
//       setError(
//         err.error || err.message || "Failed to create property. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
//       <div className="bg-slate-50 p-8 rounded-3xl shadow-lg shadow-slate-200/60">
//         <h2 className="text-3xl font-semibold text-slate-900 mb-3">Create New Property</h2>
//         <p className="text-slate-600 mb-7">Fill in the details of your property</p>

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

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="space-y-2">
//             <label htmlFor="title" className="block text-sm font-medium text-slate-700">Property Title *</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               placeholder="e.g., Beautiful House in DHA"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-sm font-medium text-slate-700">Image</label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Describe your property..."
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             ></textarea>
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Describe your property..."
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             ></textarea>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="space-y-2">
//               <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price *</label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 placeholder="0"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//               />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="type" className="block text-sm font-medium text-slate-700">Property Type *</label>
//               <select
//                 id="type"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//               >
//                 <option value="residential">Residential</option>
//                 <option value="commercial">Commercial</option>
//                 <option value="industrial">Industrial</option>
//                 <option value="agricultural">Agricultural</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="space-y-2">
//               <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status *</label>
//               <select
//                 id="status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//               >
//                 <option value="sale">For Sale</option>
//                 <option value="rent">For Rent</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="city" className="block text-sm font-medium text-slate-700">City *</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 placeholder="e.g., Lahore"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address *</label>
//             <textarea
//               id="address"
//               name="address"
//               placeholder="Full address..."
//               rows="2"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
//           >
//             {loading ? "Creating..." : "Create Property"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AgentPropertyCreate;




// ======================================================================



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProperty,
  uploadPropertyImages,
  createPropertyFeatures,
} from "../../api/property";

const AgentPropertyCreate = () => {
  const navigate = useNavigate();

  // Loading & Messages State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Property Basic Information State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    status: "sale",
    type: "residential",
    city: "",
    address: "",
  });

  // Multiple Images State
  const [images, setImages] = useState([]);

  // Features / Amenities State
  const [features, setFeatures] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  // Handle Basic Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    // Convert FileList into array
    setImages([...e.target.files]);
  };

  // Handle Feature Input Changes
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];

    updatedFeatures[index][field] = value;

    setFeatures(updatedFeatures);
  };

  // Add New Feature Field
  const addFeatureField = () => {
    setFeatures([
      ...features,
      {
        key: "",
        value: "",
      },
    ]);
  };

  // Remove Feature Field
  const removeFeatureField = (index) => {
    const updatedFeatures = [...features];

    updatedFeatures.splice(index, 1);

    setFeatures(updatedFeatures);
  };

  // Main Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // -----------------------------
      // STEP 1: CREATE PROPERTY
      // -----------------------------
      // First we create the property
      // Backend returns property_id
      // -----------------------------

      const propertyResponse = await createProperty({
        ...formData,
        price: parseInt(formData.price),
      });

      const propertyId = propertyResponse.property_id;

      // -----------------------------
      // STEP 2: UPLOAD IMAGES
      // -----------------------------
      // Upload all selected images
      // using FormData
      // -----------------------------

      if (images.length > 0) {
        await uploadPropertyImages(propertyId, images);
      }

      // -----------------------------
      // STEP 3: CREATE FEATURES
      // -----------------------------
      // Send property amenities/features
      // -----------------------------

      const validFeatures = features.filter(
        (feature) => feature.key.trim() && feature.value.trim()
      );

      if (validFeatures.length > 0) {
        await createPropertyFeatures(propertyId, validFeatures);
      }

      setSuccess("Property created successfully!");

      // Redirect after success
      setTimeout(() => {
        navigate("/agent/properties");
      }, 1500);
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong while creating property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Create Property
        </h2>

        <p className="text-slate-600 mb-8">
          Add property details, images and amenities.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Title */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Property Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Beautiful House in DHA"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe property..."
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Price & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="5000000"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Property Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
          </div>

          {/* Status & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Lahore"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Address
            </label>

            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address..."
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Multiple Images Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Property Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            />

            {/* Selected Images Preview Names */}
            {images.length > 0 && (
              <div className="mt-3 space-y-1">
                {images.map((image, index) => (
                  <p
                    key={index}
                    className="text-sm text-slate-600"
                  >
                    {image.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Features Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Property Features
              </h3>

              <button
                type="button"
                onClick={addFeatureField}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Add Feature
              </button>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3"
                >
                  {/* Feature Key */}
                  <input
                    type="text"
                    placeholder="Feature Name"
                    value={feature.key}
                    onChange={(e) =>
                      handleFeatureChange(
                        index,
                        "key",
                        e.target.value
                      )
                    }
                    className="sm:col-span-2 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                  />

                  {/* Feature Value */}
                  <input
                    type="text"
                    placeholder="Feature Value"
                    value={feature.value}
                    onChange={(e) =>
                      handleFeatureChange(
                        index,
                        "value",
                        e.target.value
                      )
                    }
                    className="sm:col-span-2 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                  />

                  {/* Remove Feature Button */}
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="rounded-2xl bg-red-500 px-4 py-3 text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
          >
            {loading ? "Creating Property..." : "Create Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentPropertyCreate;
