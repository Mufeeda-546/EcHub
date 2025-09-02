import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (user && (user.role === "admin" || (typeof isAdmin === "function" && isAdmin()))) {
    return children;
  }

  try {
    const saved = localStorage.getItem("loggedInUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.role === "admin") {
        return children;
      }
    }
  } catch (err) {}

  return <Navigate to="/login" state={{ from: location }} replace />;
}
