import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await login(formData)

    if (success) {
      alert("Login success");
      navigate("/");
    } else {
      alert("Error");
      console.log(error)
    }

  }
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Log in</h2>
          <button className="text-gray-500 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user / email address"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Log in
          </button>

          {/* Footer */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?
            <span onClick={() => navigate('/signup-page')} className="font-semibold cursor-pointer">
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;