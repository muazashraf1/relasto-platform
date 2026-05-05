import api from "./axiosInstance";

export const createReview = async (agent_id, rating, comment) => {
  try {
    const response = await api.post("/reviews/create/", {
      agent: agent_id,
      rating: parseInt(rating),
      comment: comment.trim(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAgentReviews = async (agent_id) => {
  try {
    const response = await api.get(`/reviews/agent/${agent_id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateReview = async (review_id, rating, comment) => {
  try {
    const response = await api.put(`/reviews/update/${review_id}/`, {
      rating: parseInt(rating),
      comment: comment.trim(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReview = async (review_id) => {
  try {
    const response = await api.delete(`/reviews/delete/${review_id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
