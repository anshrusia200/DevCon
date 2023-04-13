import React, { useEffect } from "react";
import { makeStatusActive } from "../../../actions/auth";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const VerifiedEmail = ({ makeStatusActive }) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const verifyCode = queryParameters.get("verifyCode");
  console.log(verifyCode);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    makeStatusActive(verifyCode);
  }, []);

  return <Navigate to="/" />;
};

VerifiedEmail.propTypes = {
  makeStatusActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makeStatusActive })(VerifiedEmail);
