import React from "react";
import { Link, Outlet } from "react-router-dom";

const AgentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-5 space-y-4">

        <h2 className="text-xl font-bold mb-6">Agent Panel</h2>

        <Link to="/agent/dashboard" className="block hover:text-orange-400">
          Dashboard
        </Link>

        <Link to="/agent/properties" className="block hover:text-orange-400">
          My Properties
        </Link>

        <Link to="/agent/create-property" className="block hover:text-orange-400">
          Add Property
        </Link>

        <Link to="/agent/requests" className="block hover:text-orange-400">
          Visit Requests
        </Link>

        <Link to="/agent/profile" className="block hover:text-orange-400">
          Profile
        </Link>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AgentDashboard;