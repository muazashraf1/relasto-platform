// import { createContext, useState } from "react";
// import { getAgents, getAgentDetail } from "../api/agent";

// export const AgentContext = createContext();

// export const AgentProvider = ({ children }) => {

//   // 🔹 STATES
//   const [agents, setAgents] = useState([]);
//   const [agentDetail, setAgentDetail] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 🔹 FILTER STATE (IMPORTANT)
//   const [filters, setFilters] = useState({
//     location: "",
//     page: 1,
//   });

//   // ==============================
//   // 📥 FETCH AGENTS LIST
//   // ==============================
//   const fetchAgents = async (customFilters = {}) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const finalFilters = { ...filters, ...customFilters };

//       const res = await getAgents(finalFilters);

//       setAgents(res);

//       setFilters(finalFilters);

//     } catch (err) {
//       setError("Failed to load agents");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // 👤 FETCH AGENT DETAIL
//   // ==============================
//   const fetchAgentDetail = async (id) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getAgentDetail(id);

//       setAgentDetail(res);

//     } catch (err) {
//       setError("Failed to load agent detail");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // 🔍 SEARCH (LOCATION)
//   // ==============================
//   const searchAgents = (location) => {
//     fetchAgents({ location, page: 1 });
//   };

//   // ==============================
//   // 📄 PAGINATION (FRONTEND SIDE)
//   // ==============================
//   const changePage = (page) => {
//     fetchAgents({ page });
//   };

//   // ==============================
//   // 🧹 CLEAR DETAIL
//   // ==============================
//   const clearAgentDetail = () => {
//     setAgentDetail(null);
//   };

//   return (
//     <AgentContext.Provider
//       value={{
//         agents,
//         agentDetail,
//         loading,
//         error,
//         filters,

//         fetchAgents,
//         fetchAgentDetail,
//         searchAgents,
//         changePage,
//         clearAgentDetail,
//       }}
//     >
//       {children}
//     </AgentContext.Provider>
//   );
// };











import { createContext, useState } from "react";
import {
  getAgents,
  getAgentDetail
} from "../api/agent";

export const AgentContext = createContext();

export const AgentProvider = ({ children }) => {

  const [agents, setAgents] = useState([]);
  const [agentDetail, setAgentDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 LIST AGENTS
  const fetchAgents = async (query = "") => {
    try {
      setLoading(true);

      const res = await getAgents(query);

      setAgents(res.results || res);

    } catch (err) {
      setError("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SINGLE AGENT
  const fetchAgentDetail = async (id) => {
    try {
      setLoading(true);

      const res = await getAgentDetail(id);

      setAgentDetail(res);

    } catch (err) {
      setError("Failed to load agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        agentDetail,
        loading,
        error,
        fetchAgents,
        fetchAgentDetail,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
