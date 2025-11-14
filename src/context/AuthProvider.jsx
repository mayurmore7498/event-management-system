import React, { useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data?.token) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const register = async (details) => {
    await registerUser(details);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;