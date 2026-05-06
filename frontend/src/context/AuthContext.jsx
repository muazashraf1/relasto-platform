import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/auth";
import { setTokens, getAccessToken, clearTokens } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true);

  // LOGIN FUNCTION
  const login = async (data) => {
    console.log("Hello...");

    try {
      setLoading(true);
      const res = await loginUser(data);

      setTokens(res);
      setUser(res.user);

      return true;
    } catch (error) {
      console.error(error);
      console.log("error in catch:", error);

      const errors = error.response?.data || {};

      console.log("errors:", errors);

      const formattedError = Object.entries(errors)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(', ')}`;
          }
          return `${key}: ${value}`;
        })
        .join(', ');

      setError(formattedError);
      console.log("formattedError:", formattedError);

      return false;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER FUNCTION
  const register = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      return true;
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);
      const errors = error.response?.data || {};

      const formattedError = Object.entries(errors)
        .map(([key, value]) => `${key}: ${value.join(', ')}`)
        .join(', ');

      setError(formattedError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // LOAD USER (on refresh)
  //   const loadUser = async () => {
  //     const token = getAccessToken();
  //     if (!token) return;

  //     try {
  //       const profile = await getProfile();
  //       setUser(profile);
  //     } catch (error) {
  //       clearTokens();
  //     }
  //   };


  const loadUser = async () => {
    const token = getAccessToken();
    if (!token) {
      setInitialLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      clearTokens();
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, error, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};