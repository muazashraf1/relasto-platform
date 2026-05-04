import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_HOST = API_BASE.replace(/\/api\/?$/, "");

function resolveImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${API_HOST}${url}`;
  return `${API_HOST}/${url}`;
}

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("best");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAgents = async (loc = "") => {
    setLoading(true);
    try {
      const query = loc ? `?location=${encodeURIComponent(loc)}` : "";
      const res = await api.get(`/accounts/agents/${query}`);
      setAgents(res.data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-4xl bg-white px-6 py-8 shadow-lg border border-slate-200 md:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">
                Relasto
              </p>
              <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Some Nearby Good Agents
              </h1>
            </div>
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <span className="mr-2 text-slate-500">Review</span>
              <span className="rounded-full bg-white px-3 py-1 text-slate-800 shadow-sm">
                {sort === "best" ? "4.5 review" : "Review"}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address"
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 pr-32 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                🔍
              </span>
            </div>
            <button
              onClick={() => fetchAgents(location)}
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full rounded-4xl bg-white p-10 text-center text-slate-500 shadow-sm border border-slate-200">
              Loading agents...
            </div>
          ) : agents.length === 0 ? (
            <div className="col-span-full rounded-4xl bg-white p-10 text-center text-slate-500 shadow-sm border border-slate-200">
              No agents found.
            </div>
          ) : (
            agents.map((agent) => {
              const imageUrl = resolveImageUrl(agent.profile_image);
              return (
                <div
                  key={agent.id}
                  className="rounded-4xl bg-white overflow-hidden shadow-xl border border-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={agent.username}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-200 text-slate-500">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 p-6">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{agent.username}</h2>
                      <p className="mt-1 text-sm text-slate-500">{agent.location || "No location"}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="text-orange-500">★</span>
                        <span className="font-semibold">4.5</span>
                      </span>
                      <span className="text-slate-400">|</span>
                      <span>4.5 review</span>
                    </div>

                    <button
                      onClick={() => navigate(`/agent/${agent.id}`)}
                      className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-4xl bg-white p-6 shadow-lg border border-slate-200">
          <p className="text-sm text-slate-500">
            Showing {agents.length} top agents near you.
          </p>
          <div className="flex gap-2">
            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              1
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              2
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              3
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Next Page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
