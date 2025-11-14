import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name"); 
    if (token && role) {
      setUser({ token, role, email, name });
    }
  }, []);

  const login = ({ token, role, email, name }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (email) localStorage.setItem("email", email);
    if (name) localStorage.setItem("name", name);
    setUser({ token, role, email, name });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};