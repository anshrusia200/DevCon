import React, { useEffect, useState } from "react";
import Email from "../../design/Email/Email";
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { resendVerificationEmail } from "../../../actions/auth";

const VerifyEmail = ({ resendVerificationEmail }) => {
  const user = useSelector((state) => state.auth.user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  if (user.status === "active") {
    return <Navigate to="/" />;
  }
  const handleClick = () => {
    resendVerificationEmail();
  };

  return (
    <div className="verify-content">
      <Email />
      <span className="verify-msg">
        Email verification link sent to your registered email 📩. <br /> Please
        verify your email ✅ to continue.
      </span>
      <button className=" resend-btn glow-btn" onClick={handleClick}>
        Resend Email
      </button>
    </div>
  );
};

VerifyEmail.propTypes = {
  resendVerificationEmail: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { resendVerificationEmail })(
  VerifyEmail
);
