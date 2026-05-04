import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AgentProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const fetchMyProperties = async () => {
    const res = await api.get("/properties/search/");
    setProperties(res.data.results);
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">My Properties</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {properties.map((p) => (
          <div key={p.id} className="bg-white p-4 shadow rounded">

            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-gray-500">{p.city}</p>

            <p className="font-bold mt-2">Rs {p.price}</p>

            <button
              onClick={() => navigate(`/property/${p.slug}`)}
              className="mt-3 text-blue-600"
            >
              View
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AgentProperties;