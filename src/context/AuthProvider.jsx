import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        withCredentials: true,
      });

      console.log("Loaded user:", res.data);

      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    await loadUser();
  };

  const register = async (data) => {
    await axios.post("http://localhost:5000/api/auth/register", data, {
      withCredentials: true,
    });
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
