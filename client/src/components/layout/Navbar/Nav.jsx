import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import PropTypes from "prop-types";
import "./Nav.css";

function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  const [sideStatus, setSideStatus] = useState(false);

  function sideToggle() {
    setSideStatus(!sideStatus);
    console.log(sideStatus);
  }
  const initiateLogout = () => {
    setSideStatus(!sideStatus);
    logout();
  };
  const authLinks = (
    <ul className={sideStatus ? "topList" : "close topList"}>
      <Link to="/posts/write" className="link" onClick={sideToggle}>
        <li className="topListItem">Write</li>
      </Link>
      <Link to="/profiles" className="link" onClick={sideToggle}>
        <li className="topListItem">Developers</li>
      </Link>
      <Link to="/posts" className="link" onClick={sideToggle}>
        <li className="topListItem">Posts</li>
      </Link>

      <Link to="/dashboard" className="link" onClick={sideToggle}>
        <li className="topListItem">Dashboard</li>
      </Link>
      <li>|</li>
      <Link className="link" onClick={initiateLogout}>
        <li className="topListItem">
          <i className="fas fa-sign-out-alt"></i>Logout
        </li>
      </Link>
    </ul>
  );
  const guestLinks = (
    <ul className={sideStatus ? "topList" : "close topList"}>
      <Link to="/profiles" className="link" onClick={sideToggle}>
        <li className="topListItem">Developers</li>
      </Link>
      <li>|</li>
      <Link to="/register" className="link" onClick={sideToggle}>
        <li className="topListItem">Register</li>
      </Link>
      <Link to="/login" className="link" onClick={sideToggle}>
        <li className="topListItem">Login</li>
      </Link>
    </ul>
  );
  return (
    <div className="top">
      <Link to="/" className="topListItem logo">
        <i className="fas fa-code"></i> DevCon
      </Link>
      <div className="topCenter">
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        <div
          className={sideStatus ? "cross hamburger" : "hamburger"}
          onClick={sideToggle}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
