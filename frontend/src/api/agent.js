import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 GET AGENTS (with search + pagination)
export const getAgents = async (query = "") => {
  const res = await axios.get(
    `${BASE_URL}/accounts/agents/?${query}`
  );
  return res.data;
};

// 🔹 GET SINGLE AGENT
export const getAgentDetail = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/accounts/profile/${id}/`
  );
  return res.data;
};