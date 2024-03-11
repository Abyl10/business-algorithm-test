import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../lib/token";

interface IProtectedRouteProps {
  component: React.ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ component }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return component;
};

export default ProtectedRoute;
