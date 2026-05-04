import { createContext, useState } from "react";
import {
  createVisitRequest,
  getAgentRequests,
  updateVisitStatus,
} from "../api/visit";

export const VisitContext = createContext();

export const VisitProvider = ({ children }) => {

  // 🔹 STATES
  const [visitRequests, setVisitRequests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 SUCCESS MESSAGE (NEW)
  const [success, setSuccess] = useState(null);

  // ==============================
  // 📝 CREATE VISIT REQUEST (USER)
  // ==============================
  const submitVisitRequest = async (slug, data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await createVisitRequest(slug, data);

      setSuccess("Request sent successfully!");

      return true;

    } catch (err) {
      setError("Failed to send request");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 📥 AGENT VIEW REQUESTS
  // ==============================
  const fetchAgentRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAgentRequests();

      setVisitRequests(res);

    } catch (err) {
      setError("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔄 UPDATE STATUS (AGENT)
  // ==============================
  const changeVisitStatus = async (id, data) => {
    try {
      setLoading(true);
      setError(null);

      await updateVisitStatus(id, data);

      // refresh list
      fetchAgentRequests();

    } catch (err) {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CLEAR MESSAGES (IMPORTANT)
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <VisitContext.Provider
      value={{
        visitRequests,
        loading,
        error,
        success,

        submitVisitRequest,
        fetchAgentRequests,
        changeVisitStatus,
        clearMessages,
      }}
    >
      {children}
    </VisitContext.Provider>
  );
};