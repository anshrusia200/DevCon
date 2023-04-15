import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { resetPassword } from "../../../actions/auth";
import { setAlert } from "../../../actions/alert";
import Spinner from "../../layout/Spinner/Spinner";
import { useLocation } from "react-router-dom";

const PasswordReset = ({ resetPassword, loading }) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  console.log(location);
  const userId = location.pathname.split("/")[2];
  const token = location.search.split("=")[1];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      await resetPassword(userId, token, password);
      setPassword("");
      setConfirmPassword("");
    } else {
      dispatch(setAlert("Passwords don't match", "danger"));
    }
  };
  return (
    <div className="main-bg auth-main">
      <section className="auth-container">
        <p className="lead">Reset Password</p>
        <p className="other-option">Change your password</p>
        <form className="form" onSubmit={(e) => onSubmitHandler(e)}>
          {/* <div className="form-group">
        <input type="text" placeholder="Name" name="name" required />
      </div> */}
          <div className="form-group">
            <div className="form-group-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? <Spinner /> : <>Submit</>}
              {/* Submit */}
              {/* {loading ? <Spinner /> : <span>Submit</span>} */}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};

PasswordReset.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { resetPassword })(PasswordReset);
