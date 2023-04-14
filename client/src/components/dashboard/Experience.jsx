import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteExperience } from "../../actions/profile";
const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>{moment(exp.from).format("MMM YY")}</td>
      {exp.current ? (
        <td>Present</td>
      ) : (
        <td>{moment(exp.to).format("MMM YY")}</td>
      )}
      <td>
        <button
          className="post-control post-delete"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="profile-table">
      <h2 className="dash-table-head">Experiences</h2>
      {!experiences.length ? (
        <p className="no-content">
          No Experience added yet. <Link to="add-experience">Add one here</Link>
        </p>
      ) : (
        <table className="dash-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>From</th>
              <th>To</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
