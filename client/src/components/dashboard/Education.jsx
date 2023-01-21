import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteEducation } from "../../actions/profile";
const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{moment(edu.from).format("MMM YYYY")}</td>
      {edu.current ? (
        <td> - Present</td>
      ) : (
        <td> - {moment(edu.from).format("MMM YYYY")}</td>
      )}
      <td>
        <button onClick={() => deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <div className="profile-table">
      <h2>Education</h2>
      {!educations.length ? (
        <p>
          No degree added yet. <Link to="add-education">Add one here</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      )}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
