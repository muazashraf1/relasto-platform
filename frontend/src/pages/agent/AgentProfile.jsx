import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AgentProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-6 shadow rounded">

      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><b>Name:</b> {user?.username}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Agent:</b> {user?.is_agent ? "Yes" : "No"}</p>

    </div>
  );
};

export default AgentProfile;