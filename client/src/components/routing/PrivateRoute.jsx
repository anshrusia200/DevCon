import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  var isActive = false;
  if (user != null) isActive = user.status === "active" ? true : false;

  if (isAuthenticated && isActive) {
    return children;
  } else if (isAuthenticated && !isActive) {
    return <Navigate to="/verify-email" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
