import React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
