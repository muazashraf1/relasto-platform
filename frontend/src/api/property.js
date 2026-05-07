import api from "./axiosInstance";

// first i am getting all the properties for landing page.

export const getProperties = async () => {
  const res = await api.get("/properties/search/?page=1");
  return res.data;
};

// secondly getting properties with filter adn pagination\

export const getFilteredProperties = async (params) => {
  // params = { city, type, min_price, max_price, page, search } all these are comming from views.py of properties line number 112-117

  const query = new URLSearchParams(params).toString();

  const res = await api.get(`/properties/search/?${query}`);
  return res.data;
};

//  GET SINGLE PROPERTY DETAIL
export const getPropertyDetail = async (slug) => {
  const res = await api.get(`/properties/${slug}/`);
  return res.data;
};

export const getAgentProperties = async (agentId, params = {}) => {
  const query = new URLSearchParams({
    agent_id: agentId,
    ...params,
  }).toString();
  const res = await api.get(`/properties/search/?${query}`);
  return res.data;
};

//  CREATE PROPERTY (AGENT ONLY)
// export const createProperty = async (data) => {
//   const res = await api.post("/properties/create/", data);
//   return res.data;
// };


export const updateProperty = async (slug, data) => {
  const res = await api.put(`/properties/update/${slug}/`, data);
  return res.data;
};

export const updatePropertyImages = async (propertyId, images) => {
  const formData = new FormData();

  // Append all images
  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.put(
    `/properties/${propertyId}/images/`,
    formData,
  );

  return response.data;
};

export const updatePropertyFeatures = async (propertyId, features) => {
  const response = await api.put(`/properties/${propertyId}/features/`, features);

  return response.data;
};


export const deleteProperty = async (slug) => {
  const res = await api.delete(`/properties/delete/${slug}/`);
  return res.data;
};

// upload the image

export const uploadPropertyImage = async (slug, formData) => {
  const res = await api.post(`/properties/images/upload/${slug}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const addPropertyFeature = async (slug, data) => {
  const res = await api.post(`/properties/features/add/${slug}/`, data);
  return res.data;
};

export const deletePropertyFeature = async (id) => {
  const res = await api.delete(`/properties/features/delete/${id}/`);
  return res.data;
};

// ========================================================================

import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

// ------------------------------------
// CREATE PROPERTY
// ------------------------------------
export const createProperty = async (data) => {
  const response = await api.post(`/properties/create/`, data);
  return response.data;
};



// ------------------------------------
// UPLOAD PROPERTY IMAGES
// ------------------------------------
export const uploadPropertyImages = async (propertyId, images) => {
  const formData = new FormData();

  // Append all images
  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post(
    `/properties/${propertyId}/images/`,
    formData,
  );

  return response.data;
};

// ------------------------------------
// CREATE PROPERTY FEATURES
// ------------------------------------
export const createPropertyFeatures = async (propertyId, features) => {
  const response = await api.post(`/properties/${propertyId}/features/`, features);

  return response.data;
};
