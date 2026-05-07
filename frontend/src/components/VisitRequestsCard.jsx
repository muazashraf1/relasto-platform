import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const VisitRequestsCard = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await api.get("/visits/my-request/");
            setRequests(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, data) => {
        try {
            await api.put(`/visits/update-request/${id}/`, data);
            fetchRequests();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Visit Requests
                </h1>

                <span className="text-sm text-slate-500">
                    Total: {requests.length}
                </span>
            </div>

            {/* EMPTY STATE */}
            {requests.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
                    No visit requests found
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">

                    {requests.map((r) => (

                        <div
                            key={r.id}
                            className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition"
                        >

                            {/* TOP */}
                            <div className="flex justify-between items-start mb-4">


                            </div>

                            {/* INFO */}
                            <div className="space-y-3">

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                    <p className="text-xs text-slate-500">Name</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {r.name}
                                    </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                    <p className="text-xs text-slate-500">Email</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {r.email}
                                    </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                    <p className="text-xs text-slate-500">Phone</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {r.phone}
                                    </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                    <p className="text-xs text-slate-500">Preferred Date</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {r.preferred_date}
                                    </p>
                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div className="mt-5 space-y-3">

                                {/* REVIEW TOGGLE */}
                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                    <span className="text-sm font-medium">Reviewed</span>

                                    <button
                                        onClick={() =>
                                            updateStatus(r.id, {
                                                is_reviewed: !r.is_reviewed
                                            })
                                        }
                                        className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${r.is_reviewed
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-300 text-black"
                                            }`}
                                    >
                                        {r.is_reviewed ? "Yes" : "No"}
                                    </button>
                                </div>

                                {/* COMPLETED TOGGLE */}
                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                    <span className="text-sm font-medium">Completed</span>

                                    <button
                                        onClick={() =>
                                            updateStatus(r.id, {
                                                is_completed: !r.is_completed
                                            })
                                        }
                                        className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${r.is_completed
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-300 text-black"
                                            }`}
                                    >
                                        {r.is_completed ? "Yes" : "No"}
                                    </button>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default VisitRequestsCard;