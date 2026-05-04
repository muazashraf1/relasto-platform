import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/auth";
import { setTokens, getAccessToken, clearTokens } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  // LOGIN FUNCTION
  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);

      setTokens(res); // save tokens
      setUser(res.user); // save user

      return true;
    } catch (error) {
      console.error(error);
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
      console.log("FULL ERROR:", error.response?.data); // 🔥 ADD THIS
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
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};