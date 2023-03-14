import React from "react";
import "./Register.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import Spinner from "../../layout/Spinner/Spinner";
import PropTypes from "prop-types";
import Footer from "../../layout/Footer/Footer";

function Register({ setAlert, register, isAuthenticated, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <section className="auth-container">
        <p className="lead">Create Account</p>
        <p className="other-option">
          Already have an account ? <Link to="/login">Login</Link>
        </p>

        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={onChange}
              // required
              value={name}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
              name="email"
            />
            <small className="form-text">
              Note : This site uses Gravatar so if you want a profile image, use
              a Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              // minLength="6"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              // minLength="6"
              onChange={onChange}
              value={password2}
            />
          </div>
          <div className="form-group form-btn">
            <button type="submit" className="glow-btn" id="btn-register">
              {loading ? <Spinner /> : <span>Register</span>}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  register,
  setAlert,
  // isAuthenticated,
})(Register);
