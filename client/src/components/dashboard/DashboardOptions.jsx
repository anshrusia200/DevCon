import React from "react";
import { Link } from "react-router-dom";
const DashboardOptions = () => {
  return (
    <div className="dash-buttons">
      <Link to="edit-profile" className="dash-button">
        <i className="fas fa-pen"></i>{" "}
        <span className="dash-btn-text"> Profile</span>
      </Link>
      <Link to="add-experience" className="dash-button">
        <span className="dash-btn-text">
          {" "}
          <i className="fa fa-plus"></i> Experience
        </span>
      </Link>
      <Link to="add-education" className="dash-button">
        <span className="dash-btn-text">
          <i className="fa fa-plus"></i> Education
        </span>
      </Link>
    </div>
  );
};

export default DashboardOptions;
