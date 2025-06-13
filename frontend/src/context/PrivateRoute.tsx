import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Role = "user" | "staff" | "admin";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // or your Role[] type
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { token, role } = React.useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <div>Access Denied: You do not have permission to view this page.</div>;
  }

  return children;
};

export default PrivateRoute;
