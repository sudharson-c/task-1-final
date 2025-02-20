"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { login as serverLogin, logout as serverLogout } from "../actions/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData, token) => {
    await serverLogin(userData, token);
    setUser(userData);
  };

  const logout = async () => {
    await serverLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
