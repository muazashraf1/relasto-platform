import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../api/property";
// import "../../styles/forms.css";

const AgentPropertyCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    status: "sale",
    type: "residential",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.city ||
      !formData.address
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.price < 0) {
      setError("Price cannot be negative");
      setLoading(false);
      return;
    }

    try {
      const response = await createProperty({
        ...formData,
        price: parseInt(formData.price),
      });

      setSuccess("Property created successfully!");
      setTimeout(() => {
        navigate("/agent/properties");
      }, 1500);
    } catch (err) {
      setError(
        err.error || err.message || "Failed to create property. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="bg-slate-50 p-8 rounded-3xl shadow-lg shadow-slate-200/60">
        <h2 className="text-3xl font-semibold text-slate-900 mb-3">Create New Property</h2>
        <p className="text-slate-600 mb-7">Fill in the details of your property</p>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 mb-5 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 mb-5 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Property Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Beautiful House in DHA"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your property..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            ></textarea>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-slate-700">Property Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-slate-700">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="e.g., Lahore"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address *</label>
            <textarea
              id="address"
              name="address"
              placeholder="Full address..."
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentPropertyCreate;