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
      <td>{moment(edu.from).format("MMM YY")}</td>
      {edu.current ? (
        <td> Present</td>
      ) : (
        <td> {moment(edu.from).format("MMM YY")}</td>
      )}
      <td>
        <button
          className="post-control post-delete"
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="profile-table">
      <h2 className="dash-table-head">Education</h2>
      {!educations.length ? (
        <p className="no-content">
          No degree added yet. <Link to="add-education">Add one here</Link>
        </p>
      ) : (
        <table className="dash-table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>From</th>
              <th>To</th>
              <th>Control</th>
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
