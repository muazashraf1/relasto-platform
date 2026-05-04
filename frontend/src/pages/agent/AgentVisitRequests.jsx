import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

const AgentVisitRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/visits/my-request/");
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/visits/update-request/${id}/`, { status });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Visit Requests</h1>

      {requests.map((r) => (
        <div key={r.id} className="bg-white p-4 mb-3 shadow rounded">

          <p><b>Email:</b> {r.email}</p>
          <p><b>Phone:</b> {r.phone}</p>
          <p><b>Date:</b> {r.preferred_date}</p>
          <p><b>Status:</b> {r.status}</p>

          <div className="flex gap-2 mt-3">

            <button
              onClick={() => updateStatus(r.id, "accepted")}
              className="bg-green-500 text-white px-3 py-1"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(r.id, "rejected")}
              className="bg-red-500 text-white px-3 py-1"
            >
              Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default AgentVisitRequests;