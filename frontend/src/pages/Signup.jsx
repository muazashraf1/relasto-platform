import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { register, loading, error } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    is_agent: false,
  });


  const navigate = useNavigate()

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "is_agent"
          ? value === "true"   // string → boolean
          : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM DATA:", form); // 🔥 ADD THIS

    const res = await register(form);

    if (res) {
      console.log("OK");
      toast.success("Signup Successfull, please login!")
      navigate("/login-page")
    } else {
      console.log("FAILED");
    }
  };


  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error])


  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center pt-26">
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <button className="text-gray-500 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* is_agent Select */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Account Type
            </label>
            <select
              name="is_agent"
              value={form.is_agent}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="false">User</option>
              <option value="true">Agent</option>
            </select>
          </div>

          {/* Button */}
          <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm mt-6">
            Already have an account?
            <Link to="/login-page">
              <span className="font-semibold cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;