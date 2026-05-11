import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate()

  const { login, error, loading, user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  console.log(user);

  // for validation
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let errs = {};

    if (!formData.email) {
      errs.email = "Required Email!";
    }

    if (!formData.password) {
      errs.password = "Required Password!";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };




  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [user])


  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const success = await login(formData)

  //   console.log(success);


  //   if (success) {
  //     toast.success("Login Successfully")
  //     navigate("/");
  //   } else {
  //     console.log(error)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = handleValidation();

    if (isValid) {
      const success = await login(formData);

      console.log(success);

      if (success) {
        toast.success("Login Successfully");
        navigate("/");
      } else {
        console.log(error);
      }
    }
  };

  console.log("error:", error);

  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error])


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
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />

            {errors.email && (
              <span className="text-red-700 text-lg">
                {errors.email}
              </span>
            )}


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

            {errors.password && (
              <span className="text-red-700 text-lg">
                {errors.password}
              </span>
            )}
          </div>

          {/* Button */}
          <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            {loading ? "Loading..." : "Log in"}
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