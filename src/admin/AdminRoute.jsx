// src/admin/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // 1) If context already has a logged-in admin -> allow
  if (user && (user.role === "admin" || (typeof isAdmin === "function" && isAdmin()))) {
    return children;
  }

  // 2) Fallback: check localStorage directly so we don't accidentally
  //    redirect a returning user while context is still initializing
  try {
    const saved = localStorage.getItem("loggedInUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.role === "admin") {
        return children;
      }
    }
  } catch (err) {
    // ignore parse errors and fall through to redirect
  }

  // 3) Not an admin (or not logged in) -> send to login
  //    Pass the attempted location in state so Login can return user here after success
  return <Navigate to="/login" state={{ from: location }} replace />;
}
