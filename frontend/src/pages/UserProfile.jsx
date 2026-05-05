import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login-page");
      return;
    }

    // Load initial profile data
    const loadProfile = async () => {
      try {
        const response = await api.get("/accounts/profile/");
        const profileData = response.data;

        setFormData({
          bio: profileData.bio || "",
          location: profileData.location || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.put("/accounts/profile/", formData);
      
      setSuccess("Profile updated successfully!");

      if (setUser) {
        setUser((prev) => ({
          ...prev,
          phone: formData.phone,
          address: formData.address,
        }));
      }
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
        <p className="text-base font-medium text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50">
        <h2 className="text-3xl font-semibold text-slate-900 mb-3">My Profile</h2>
        <p className="text-slate-600 mb-8">Update your personal information</p>

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

        <div className="mb-8 border-b border-slate-200 pb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Account Information</h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
            <div>
              <p className="text-slate-500 mb-1">Username</p>
              <p className="font-semibold text-slate-900">{user?.username}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Email</p>
              <p className="font-semibold text-slate-900">{user?.email}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-500 mb-1">Account Type</p>
              <p className="font-semibold text-slate-900">{user?.is_agent ? "Agent" : "Regular User"}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            ></textarea>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Lahore, Pakistan"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g., +92 300 1234567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Full address..."
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
