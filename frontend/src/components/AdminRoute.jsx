import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"; // strict check

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" replace />; // replace prevents back button going back
  }

  return children;
};

export default AdminRoute;
