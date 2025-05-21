import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// ✅ Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
