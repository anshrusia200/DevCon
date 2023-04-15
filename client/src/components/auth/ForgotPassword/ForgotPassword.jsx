import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { forgotPassword } from "../../../actions/auth";
import Spinner from "../../layout/Spinner/Spinner";

const ForgotPassword = ({ forgotPassword, loading }) => {
  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setEmail("");
    console.log(email);
  };
  return (
    <div className="main-bg auth-main">
      <section className="auth-container">
        <p className="lead">Forgot Password</p>
        <p className="other-option">
          Enter the Email address. We will send a password reset link to that
          email.
        </p>
        <form className="form" onSubmit={(e) => onSubmitHandler(e)}>
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
                onChange={(e) => setEmail(e.target.value)}
              />

              <div class="input-img">
                <div class="input-icon">
                  <img
                    src="https://res.cloudinary.com/appcloudansh/image/upload/v1681553204/email_kmas4a.png"
                    alt=""
                    width="20"
                    height="18"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group form-btn">
            <button type="submit" className="glow-btn" id="btn-register">
              {loading ? <Spinner /> : <>Submit</>}
              {/* {loading ? <Spinner /> : <span>Submit</span>} */}
            </button>
          </div>
        </form>
        <p className="other-option">
          Recalled your password ? <Link to="/Login">Login</Link>
        </p>
      </section>
      <Footer />
    </div>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
