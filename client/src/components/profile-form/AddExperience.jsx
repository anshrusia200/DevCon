import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleToDateDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
    navigate("/dashboard");
  };
  return (
    <div className="main-bg">
      <Link to="/dashboard" className="back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Profile
      </Link>
      <section className="main">
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <div className="form-wrapper">
          {" "}
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Job Title"
                name="title"
                required
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Company"
                name="company"
                value={company}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input type="date" name="from" value={from} onChange={onChange} />
            </div>
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  id="currentJob"
                  checked={current}
                  value={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleToDateDisabled(!toDateDisabled);
                  }}
                />

                <label for="currentJob">Current Job</label>
              </p>
            </div>
            {!toDateDisabled ? (
              <div className="form-group">
                <h4>To Date</h4>
                <input
                  type="date"
                  name="to"
                  value={to}
                  onChange={onChange}
                  disabled={toDateDisabled ? "disabled" : ""}
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>
            <input type="submit" className="submit-profile-btn" />
            <Link to="/dashboard" className="back-btm ">
              Back to Profile
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
