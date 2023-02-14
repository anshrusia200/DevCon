import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
const ProfileEducation = ({ education }) => {
  return (
    <div className="profile-contents">
      <h2 className="school">
        {" "}
        <i class="fa-solid fa-school"></i> {education.school}
      </h2>

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
        <b>Degree&nbsp;</b>: {education.degree}
      </p>
      <p>
        <b>Field of Study&nbsp;</b>: {education.fieldofstudy}
      </p>
      <p>
        <b>Description&nbsp;</b>:{" "}
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
