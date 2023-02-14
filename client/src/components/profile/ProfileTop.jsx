import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const ProfileTop = ({
  profile: {
    user: { name, avatar },
    status,
    company,
    location,
    skills,
    website,
    social,
  },
}) => {
  // console.log(social);
  return (
    <div className="profile-top">
      <div className="profile-img-wrap">
        <img className="profile-img" src={avatar} alt="" />
      </div>
      <h1 className="single-profile-name">{name}</h1>
      <p className="single-profile-company">
        {status} {company ? <> at {company} </> : ""}
      </p>
      <p className="single-profile-location">
        {location ? <> {location} </> : ""}
      </p>

      <div className="profile-icons">
        {website && (
          <a href={website} target="_blank" className="profile-icon">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social ? (
          <>
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-icon"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-icon"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-icon"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-icon"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-icon"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
