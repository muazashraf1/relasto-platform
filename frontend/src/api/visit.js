import api from "./axiosInstance";

// CREATE
export const createVisitRequest = async (slug, data) => {
  const res = await api.post(`/visits/create-request/${slug}/`, data);
  return res.data;
};

// AGENT LIST
export const getAgentRequests = async () => {
  const res = await api.get(`/visits/my-request/`);
  return res.data;
};

// UPDATE STATUS
export const updateVisitStatus = async (id, data) => {
  const res = await api.put(`/visits/update-request/${id}/`, data);
  return res.data;
};