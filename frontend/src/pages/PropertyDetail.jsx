import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";
import { VisitContext } from "../context/VisitContext";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000";

const PropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 🔹 PROPERTY CONTEXT
  const {
    propertyDetail,
    fetchPropertyDetail,
    clearPropertyDetail,
    loading: propertyLoading,
  } = useContext(PropertyContext);

  // 🔹 VISIT CONTEXT
  const {
    submitVisitRequest,
    success,
    error,
    loading: visitLoading,
    clearMessages,
  } = useContext(VisitContext);

  // 🔹 AUTH
  const { user } = useContext(AuthContext);

  // 🔹 FORM STATE
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    preferred_date: "",
  });

  // ==============================
  // LOAD PROPERTY
  // ==============================
  useEffect(() => {
    fetchPropertyDetail(slug);

    return () => clearPropertyDetail();
  }, [slug]);

  // ==============================
  // REDIRECT IF NOT LOGIN
  // ==============================
  useEffect(() => {
    if (!user) {
      navigate("/login-page");
    }
  }, [user]);

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    clearMessages(); // 🔥 important

    const res = await submitVisitRequest(slug, formData);

    if (res) {
      setFormData({
        phone: "",
        email: "",
        preferred_date: "",
      });
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (propertyLoading || !propertyDetail) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const primaryImage = propertyDetail.images?.find(
    (img) => img.is_primary
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* 🔥 LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={BASE_URL + primaryImage?.image}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* SMALL IMAGES */}
        <div className="grid grid-cols-3 gap-4">
          {propertyDetail.images?.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={BASE_URL + img.image}
              className="h-32 w-full object-cover rounded-lg"
            />
          ))}
        </div>

        {/* DETAILS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            {propertyDetail.title}
          </h2>

          <p className="text-gray-500 mb-2">
            📍 {propertyDetail.city}
          </p>

          <p className="text-lg font-bold">
            Rs. {propertyDetail.price}
          </p>

          <p className="text-sm text-gray-600 mt-4">
            {propertyDetail.description}
          </p>
        </div>

        {/* FEATURES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Home Highlights</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {propertyDetail.features?.map((f, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span className="text-gray-500">{f.key}</span>
                <span className="font-medium">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AGENT */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Agent Information</h3>

          <p className="font-medium">
            {propertyDetail.agent?.username}
          </p>
          <p className="text-sm text-gray-500">
            {propertyDetail.agent?.email}
          </p>
        </div>

      </div>

      {/* 🔥 RIGHT SIDE FORM */}
      <div className="bg-white p-6 rounded-xl shadow h-fit">

        <h3 className="font-semibold mb-4">Request for Visit</h3>

        {success && (
          <p className="text-green-600 mb-3 text-sm">{success}</p>
        )}

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="datetime-local"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={visitLoading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {visitLoading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetail;