import React from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { setAlert } from "../../../actions/alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../../actions/auth";
import Spinner from "../../layout/Spinner/Spinner";
import Footer from "../../layout/Footer/Footer";

function Login({ login, isAuthenticated, loading }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    console.log("checked");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="main-bg auth-main">
      <section className="auth-container">
        <p className="lead">Login</p>
        <p className="other-option">
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
        <form className="form" onSubmit={onSubmit}>
          {/* <div className="form-group">
          <input type="text" placeholder="Name" name="name" required />
        </div> */}
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
              />
              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../dist/assets/email.png"
                    alt=""
                    width="20"
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
                placeholder="Password"
                name="password"
                value={password}
                minLength="6"
                onChange={onChange}
              />

              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="../dist/assets/LOCK.png"
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
              {loading ? <Spinner /> : <span>Login</span>}
            </button>
          </div>
          <div className="other-option">
            <Link to="/forgot-password">Forgot Password ?</Link>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
