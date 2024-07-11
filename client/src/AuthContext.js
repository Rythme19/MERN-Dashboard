import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");
    const storedToken = localStorage.getItem("token");
    if (storedAuth && storedRole && storedToken) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setToken(storedToken);
    }
  }, []);

  const login = (role, token) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
