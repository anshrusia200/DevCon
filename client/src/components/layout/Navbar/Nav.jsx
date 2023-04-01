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
      <li className="link">
        <Link to="/posts/write" className="topListItem" onClick={sideToggle}>
          Write
        </Link>
      </li>
      <li className="link">
        <Link to="/profiles" className="topListItem" onClick={sideToggle}>
          Developers
        </Link>
      </li>
      <li className="link">
        <Link to="/posts" className="topListItem" onClick={sideToggle}>
          Posts
        </Link>
      </li>

      <li className="link">
        <Link to="/dashboard" className="topListItem" onClick={sideToggle}>
          Dashboard
        </Link>
      </li>
      <li>|</li>
      <li className="link">
        <Link className="topListItem" onClick={initiateLogout}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className={sideStatus ? "topList" : "close topList"}>
      <li className="link">
        {" "}
        <Link to="/profiles" className="topListItem" onClick={sideToggle}>
          Developers
        </Link>
      </li>
      <li>|</li>
      <li className="link">
        <Link to="/register" className="topListItem" onClick={sideToggle}>
          Register
        </Link>
      </li>
      <li className="link">
        <Link to="/login" className="topListItem" onClick={sideToggle}>
          Login
        </Link>
      </li>
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
