import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleToDateDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
    navigate("/dashboard");
  };
  return (
    <div className="main-bg">
      <Link to="/dashboard" className="back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Profile
      </Link>
      <section className="main">
        <h1 className="large text-primary">Add An Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add your education/degree
          information
        </p>
        <small>* = required field</small>
        <div className="form-wrapper">
          {" "}
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* School"
                name="school"
                required
                value={school}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Degree"
                name="degree"
                value={degree}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
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
                  name="currentEdu"
                  id="currentEdu"
                  checked={current}
                  value={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleToDateDisabled(!toDateDisabled);
                  }}
                />
                <label for="currentEdu">Currently pursuing</label>
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
                placeholder="Description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>
            <input type="submit" className="submit-profile-btn" />
            <Link className="back-btm" to="/dashboard">
              Back to Profile
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
