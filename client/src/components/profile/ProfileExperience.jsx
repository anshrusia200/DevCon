import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
const ProfileExperience = ({ experience }) => {
  return (
    <div className="profile-contents">
      <h2 className="company">
        <i class="fas fa-user-tie"></i> {experience.company}
      </h2>
      <p>
        {moment(experience.from).format("MMM YYYY")} -{" "}
        {experience.current ? (
          "Present"
        ) : (
          <>
            {experience.to ? (
              <>{moment(experience.to).format("MMM YYYY")}</>
            ) : (
              <>Present</>
            )}
          </>
        )}
      </p>
      <p>
        <b>Position&nbsp;</b>: {experience.title}
      </p>
      <p>
        <b>Description&nbsp;</b>:{" "}
        {experience.description ? (
          <>{experience.description}</>
        ) : (
          <span>No Description provided</span>
        )}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
