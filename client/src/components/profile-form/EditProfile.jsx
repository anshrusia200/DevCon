import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createNewProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createNewProfile,
  getCurrentProfile,
}) => {
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
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.twitter ? "" : profile.twitter,
      facebook: loading || !profile.facebook ? "" : profile.facebook,
      linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
      youtube: loading || !profile.youtube ? "" : profile.youtube,
      instagram: loading || !profile.instagram ? "" : profile.instagram,
    });
  }, [loading]);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    createNewProfile(formData, true);
    navigate("/dashboard");
  };
  return (
    <div>
      <section className="main">
        <h1>Edit Your Profile</h1>
        <h3>
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </h3>
        <div className="form-wrapper">
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <select name="status" onChange={onChange} value={status}>
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
                value={company}
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
                value={website}
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
                value={location}
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
                value={skills}
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
                value={githubusername}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                placeholder="A short bio of yourself"
                name="bio"
                onChange={onChange}
                value={bio}
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="social-box">
              <button
                type="button"
                className="glow-btn btn2"
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
                <div className="form-group">
                  <small className="form-text">
                    Provide full URL like <u>https://youtube.com</u>
                  </small>
                </div>
                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    onChange={onChange}
                    value={twitter}
                  />
                  <i className="fab fa-twitter fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    onChange={onChange}
                    value={facebook}
                  />
                  <i className="fab fa-facebook fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    onChange={onChange}
                    value={youtube}
                  />
                  <i className="fab fa-youtube fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    onChange={onChange}
                    value={linkedin}
                  />
                  <i className="fab fa-linkedin fa-2x"></i>
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    onChange={onChange}
                    value={instagram}
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
            <Link to="/dashboard">Go Back</Link>
          </form>
        </div>
      </section>
    </div>
  );
};

EditProfile.propTypes = {
  createNewProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  createNewProfile,
})(EditProfile);
