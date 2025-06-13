import React, { createContext, useState, ReactNode, useEffect } from "react";
import jwt_decode from "jwt-decode";

interface JwtPayload {
  userId: string;
  role: "user" | "staff" | "admin";
  exp: number;
}

interface AuthContextType {
  token: string | null;
  role: "user" | "staff" | "admin" | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [role, setRole] = useState<"user" | "staff" | "admin" | null>(null);

  useEffect(() => {
  if (token) {
    try {
      const decoded = jwt_decode<JwtPayload>(token);
      setRole(decoded.role);
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  } else {
    setRole(null);
  }
}, [token]);


  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
