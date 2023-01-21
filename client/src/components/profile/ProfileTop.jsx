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
    <div>
      <div className="profile-top bg-primary p-2">
        <img className="round-img my-1" src={avatar} alt="" />
        <h1 className="large">{name}</h1>
        <p className="lead">
          {status} {company ? <> at {company} </> : ""}
        </p>
        <p>{location ? <> {location} </> : ""}</p>

        <div className="icons my-1">
          {website && (
            <a href={website} target="_blank">
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
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
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
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
