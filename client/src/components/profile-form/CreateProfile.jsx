import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewProfile } from "../../actions/profile";

const CreateProfile = ({ createNewProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [socialOpen, setSocialOpen] = useState(false);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    createNewProfile(formData);
    navigate("/dashboard");
  };
  return (
    <div className="main-bg">
      <Link to="/dashboard" className="back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Profile
      </Link>
      <section className="main">
        <h1 className="large text-primary">Create Your Profile</h1>

        <p className="lead">
          Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>

        <div className="form-wrapper">
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <select name="status" onChange={onChange}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                onChange={onChange}
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Website"
                name="website"
                onChange={onChange}
              />
              <small className="form-text">
                Provide full URL of your own or a company website.
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                onChange={onChange}
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Skills"
                name="skills"
                onChange={onChange}
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                onChange={onChange}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                placeholder="A short bio of yourself"
                rows="5"
                name="bio"
                onChange={onChange}
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="social-box">
              <button
                type="button"
                className=""
                onClick={() => {
                  setSocialOpen(!socialOpen);
                }}
              >
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            {socialOpen ? (
              <>
                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    onChange={onChange}
                  />
                  <i className="fab fa-twitter fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    onChange={onChange}
                  />
                  <i className="fab fa-facebook fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    onChange={onChange}
                  />
                  <i className="fab fa-youtube fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    onChange={onChange}
                  />
                  <i className="fab fa-linkedin fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    onChange={onChange}
                  />
                  <i className="fab fa-instagram fa-2x"></i>
                </div>
              </>
            ) : (
              ""
            )}

            <button type="submit" className="glow-btn" id="submit-btn">
              Submit
            </button>
            <Link to="/dashboard" className="back-btm">
              Go Back
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

CreateProfile.propTypes = {
  createNewProfile: PropTypes.func.isRequired,
};
export default connect(null, { createNewProfile })(CreateProfile);
