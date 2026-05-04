import React, { useState } from "react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AgentPropertyCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    type: "residential",
    status: "sale",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/properties/create/", form);
      alert("Property Created!");
      navigate("/agent/properties");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-4">Create Property</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="title" onChange={handleChange} placeholder="Title" className="border p-2 w-full" />

        <textarea name="description" onChange={handleChange} placeholder="Description" className="border p-2 w-full" />

        <input name="price" onChange={handleChange} placeholder="Price" className="border p-2 w-full" />

        <input name="city" onChange={handleChange} placeholder="City" className="border p-2 w-full" />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>

      </form>

    </div>
  );
};

export default AgentPropertyCreate;