
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


  // Validation State
  const [validationErrors, setValidationErrors] = useState({});

  // Validation Function
  const handleValidation = () => {
    let errs = {};

    if (!formData.title.trim()) {
      errs.title = "Property title is required!";
    }

    if (!formData.description.trim()) {
      errs.description = "Description is required!";
    }

    if (!formData.price) {
      errs.price = "Price is required!";
    }

    if (!formData.city.trim()) {
      errs.city = "City is required!";
    }

    if (!formData.address.trim()) {
      errs.address = "Address is required!";
    }

    // Optional image validation
    if (images.length === 0) {
      errs.images = "At least one image is required!";
    }

    setValidationErrors(errs);

    return Object.keys(errs).length === 0;
  };


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

    const isValid = handleValidation();

    if (!isValid) return;

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
        // navigate("/agent/properties");
        navigate("/profile");
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

            {validationErrors.title && (
              <span className="text-red-600 text-sm">
                {validationErrors.title}
              </span>
            )}
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

            {validationErrors.description && (
              <span className="text-red-600 text-sm">
                {validationErrors.description}
              </span>
            )}

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

              {validationErrors.price && (
                <span className="text-red-600 text-sm">
                  {validationErrors.price}
                </span>
              )}
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

              {validationErrors.city && (
                <span className="text-red-600 text-sm">
                  {validationErrors.city}
                </span>
              )}
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

            {validationErrors.address && (
              <span className="text-red-600 text-sm">
                {validationErrors.address}
              </span>
            )}
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

            {validationErrors.images && (
              <span className="text-red-600 text-sm">
                {validationErrors.images}
              </span>
            )}

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
