import React from "react";
import { Link } from "react-router-dom";
const DashboardOptions = () => {
  return (
    <div className="dash-buttons">
      <Link to="edit-profile" className="dash-button">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="add-experience" className="dash-button">
        <i className="fab fa-black-tie"></i> Add Experience
      </Link>
      <Link to="add-education" className="dash-button">
        <i className="fas fa-graduation-cap"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardOptions;
