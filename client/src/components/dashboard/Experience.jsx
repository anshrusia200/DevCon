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
      <td>{moment(exp.from).format("MMM YYYY")}</td>
      {exp.current ? (
        <td>-Present</td>
      ) : (
        <td> - {moment(exp.from).format("MMM YYYY")}</td>
      )}
      <td>
        <button onClick={() => deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <div className="profile-table">
      <h2>Experiences</h2>
      {!experiences.length ? (
        <p>
          No Experience added yet. <Link to="add-experience">Add one here</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
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
