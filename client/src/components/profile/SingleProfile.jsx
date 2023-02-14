import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import moment from "moment";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";

const SingleProfile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, []);
  return (
    <section className="profile-container">
      {profile === null ? (
        <>No profile exists for this user</>
      ) : (
        <>
          <Link to="/profiles" className="back-profile">
            <i class="fa fa-arrow-left"></i> Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/dashboard/edit-profile" className="edit-profile">
                <i class="fa fa-edit"></i> Edit Profile
              </Link>
            )}
          <div className="profile-single">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-third">
              <div className="profile-experience">
                <h2 className="head">Experience</h2>
                {profile.experience.length > 0 ? (
                  <div className="experience-container">
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </div>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
              <div className="profile-education">
                <h2 className="head">Education</h2>
                {profile.education.length > 0 ? (
                  <div className="education-container">
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </div>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

SingleProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(SingleProfile);
