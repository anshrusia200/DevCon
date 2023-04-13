import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  return (
    <div className="profile-bio">
      <div className="bio">
        <h1>{profile.user.name}'s Bio</h1>
        <p>
          {profile.bio ? <span>{profile.bio}</span> : <span>No Bio found</span>}
        </p>
      </div>
      {/* <div className="divider"></div> */}
      <div className="skills">
        <h1>Skills</h1>
        <ul>
          {profile.skills.map((skill) => (
            <li>
              <i className="fas fa-check" style={{ color: "#ff8a00" }}></i>{" "}
              &nbsp;
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
