import React, { useState } from "react";
import api from "../api/axiosInstance";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
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
    if (!formData.full_name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/accounts/contact/", formData);
      setSuccess(response.data.message || "Message sent successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="text-center py-15 px-5 bg-gray-50">
        <h1 className="text-5xl font-bold mb-5 text-black">Get in touch</h1>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-sm">
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment, so blinded by desire, that they cannot foresee the pain and
          trouble.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-15 px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-black">Send a message</h2>

            {error && <div className="p-4 rounded-md mb-5 text-sm bg-red-50 border border-red-500 text-red-700">{error}</div>}
            {success && <div className="p-4 rounded-md mb-5 text-sm bg-green-50 border border-green-500 text-green-700">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="full_name" className="block mb-2 font-medium text-gray-700 text-sm">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md font-inherit text-sm focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700 text-sm">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md font-inherit text-sm focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700 text-sm">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md font-inherit text-sm focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700 text-sm">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md font-inherit text-sm resize-vertical focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full p-4 bg-black text-white border-none rounded-md text-base font-bold cursor-pointer transition-colors duration-300 mt-3 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>

          {/* Office Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-black">Office Address</h2>
            <div className="mb-5">
              <p className="text-gray-600 text-sm leading-relaxed">1521 San Pedro St, Los Angeles, CA 90015</p>
            </div>

            <div className="mb-5">
              <p className="text-gray-600 text-sm leading-relaxed">(323) 456-7890</p>
            </div>

            <div className="mb-5">
              <p className="text-gray-600 text-sm leading-relaxed">info@mail.com</p>
            </div>

            <h3 className="text-base font-bold mb-4 text-black">Social</h3>
            <div className="flex gap-4 mt-4">
              <a href="#" title="Facebook" className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 no-underline text-lg transition-colors duration-300 hover:bg-black hover:text-white">f</a>
              <a href="#" title="Twitter" className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 no-underline text-lg transition-colors duration-300 hover:bg-black hover:text-white">𝕏</a>
              <a href="#" title="Instagram" className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 no-underline text-lg transition-colors duration-300 hover:bg-black hover:text-white">📷</a>
              <a href="#" title="LinkedIn" className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 no-underline text-lg transition-colors duration-300 hover:bg-black hover:text-white">in</a>
              <a href="#" title="RSS" className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 no-underline text-lg transition-colors duration-300 hover:bg-black hover:text-white">📡</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-gray-50 py-15 px-5 border-t border-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div>
            <h4 className="text-base font-bold mb-4 text-black">Relasto</h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">58 Beverly Hill Ave, Brooklyn Town, New York, NY 6234, USA.</p>
            <p className="text-xs text-gray-600 leading-relaxed mt-3">+1(231) 456-7890</p>
            <div className="flex gap-3 mt-3">
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 no-underline text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white">f</a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 no-underline text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white">𝕏</a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 no-underline text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white">📷</a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 no-underline text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white">📧</a>
              <a href="#" className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 no-underline text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white">🔗</a>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-black">Features</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Home v1</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Home v2</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">About</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Contact</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Search</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-black">Information</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Listings v2</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Listing v2</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">License</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-black">Documentation</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Agent List</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Agent Profile</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Log in</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Reset Password</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Create Account</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-black">Others</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Enter OTP</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">New Listing</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">License</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Reset Password</a></li>
              <li className="mb-2"><a href="#" className="text-xs text-gray-600 no-underline transition-colors duration-300 hover:text-black">Create Account</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-300 text-gray-600 text-xs">
          <p>&copy; 2025. All rights reserved</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;