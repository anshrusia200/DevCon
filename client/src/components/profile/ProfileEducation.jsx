import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h2>{education.school}</h2>
      <p>
        {moment(education.from).format("MMM YYYY")} -{" "}
        {education.current ? (
          "Present"
        ) : (
          <>
            {education.to ? (
              <>{moment(education.to).format("MMM YYYY")}</>
            ) : (
              <>Present</>
            )}
          </>
        )}
      </p>
      <p>
        <b>Degree</b>: {education.degree}
      </p>
      <p>
        <b>Field of Study</b>: {education.fieldofstudy}
      </p>
      <p>
        <b>Description</b>:{" "}
        {education.description ? (
          <>{education.description}</>
        ) : (
          <span>No Description provided</span>
        )}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
