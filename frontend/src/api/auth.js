// import axios from "axios";

// const BASEURL = import.meta.env.VITE_API_URL;

// export const registerUser = async (data) => {
//   try {
//     const register = await axios.post(`${BASEURL}/accounts/register`, data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const loginUser = async () => {
//   try {
//     const login = await axios.post(`${BASEURL}/accounts/token`, data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const refreshToken = async () => {
//   try {
//     const refresh = await axios.post(`${BASEURL}/accounts/refresh`, data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getProfile = async () => {
//   try {
//     const gettingProfile = await axios.get(`${BASEURL}/accounts/profile`);
//   } catch (error) {
//     console.error(error);
//   }
// };




// ===========================



// import axios from "axios";
// import api from "./axiosInstance";

// const BASEURL = import.meta.env.VITE_API_URL;

// export const registerUser = async (data) => {
//   const res = await axios.post(`${BASEURL}/accounts/register/`, data);
//   return res.data;
// };

// export const loginUser = async (data) => {
//   const res = await axios.post(`${BASEURL}/accounts/token/`, data);
//   return res.data;
// };

// export const refreshToken = async (refresh) => {
//   const res = await axios.post(`${BASEURL}/accounts/token/refresh/`, {
//     refresh,
//   });
//   return res.data;
// };

// export const getProfile = async (token) => {
//   const res = await axios.get(`${BASEURL}/accounts/profile/`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };




import api from "./axiosInstance";

export const registerUser = async (data) => {
  const res = await api.post(`/accounts/register/`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post(`/accounts/token/`, data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get(`/accounts/profile/`);
  return res.data;
};