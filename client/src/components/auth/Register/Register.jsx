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
  const [showPass, setShowPass] = useState(false);
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
    <div className="main-bg auth-main">
      <section className="auth-container">
        <p className="lead">Create Account</p>
        <p className="other-option">
          Already have an account ? <Link to="/login">Login</Link>
        </p>

        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                // required
                value={name}
              />
              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../src/assets/name.png"
                    alt=""
                    width="14"
                    height="18"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                name="email"
              />

              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../src/assets/email.png"
                    alt=""
                    width="20"
                    height="18"
                  />
                </div>
              </div>
            </div>
            <small className="form-text">
              Note : Please use a{" "}
              <a
                href="https://en.gravatar.com/support/activating-your-account/"
                target="_blank"
              >
                gravatar
              </a>{" "}
              email
            </small>
          </div>
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                // minLength="6"
                onChange={onChange}
                value={password}
              />
              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../src/assets/lock.png"
                    alt=""
                    width="18"
                    height="18"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Confirm Password"
                name="password2"
                // minLength="6"
                onChange={onChange}
                value={password2}
              />

              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../src/assets/lock.png"
                    alt=""
                    width="18"
                    height="18"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-show-pass">
            <input
              type="checkbox"
              name="showPass"
              id="showPass"
              onClick={(e) => setShowPass(e.target.checked)}
            />
            &nbsp;
            <label for="showPass">Show password</label>
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
