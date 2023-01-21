import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
const ProfileExperience = ({ experience }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      <div>
        <h2>{experience.company}</h2>
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
          <b>Position</b>: {experience.title}
        </p>
        <p>
          <b>Description</b>:{" "}
          {experience.description ? (
            <>{experience.description}</>
          ) : (
            <span>No Description provided</span>
          )}
        </p>
      </div>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
