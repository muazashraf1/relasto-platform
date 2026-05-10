import { createContext, useState } from "react";
import { getAgentDetail } from "../api/agent";

export const SingleAgentContext = createContext();

export const SingleAgentProvider = ({ children }) => {

  const [agent, setAgent] = useState(null);

  const [agentLoading, setAgentLoading] = useState(false);

  const [agentError, setAgentError] = useState("");



  const fetchSingleAgent = async (id) => {

    try {

      setAgentLoading(true);

      setAgentError("");

      const res = await getAgentDetail(id);

      setAgent(res);

    } catch (err) {

      console.error(err);

      setAgentError("Failed to load agent");

    } finally {

      setAgentLoading(false);

    }
  };



  return (
    <SingleAgentContext.Provider
      value={{
        agent,
        agentLoading,
        agentError,
        fetchSingleAgent,
      }}
    >
      {children}
    </SingleAgentContext.Provider>
  );
};