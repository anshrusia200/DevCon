import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner/Spinner";
import PropTypes from "prop-types";
import VectorImage from "../design/VectorImage/VectorImage";
import VectorImage2 from "../design/VectorImage/VectorImage2";
import DashboardOptions from "./DashboardOptions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    console.log("Profile loaded");
    getCurrentProfile();
  }, []);

  return (
    <div className="main">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          {!loading && profile !== null ? (
            <div className="dashboard">
              <div className="top">
                <div className="profile">
                  <img src={user && user.avatar} alt="User Profile Image" />
                </div>
                <DashboardOptions />
              </div>
            </div>
          ) : (
            <>
              <VectorImage />
              <div className="no-profile">
                <div className="profile">
                  <img src={user && user.avatar} alt="User Profile Image" />
                </div>
                <h2>Welcome, {user && user.name}</h2>
                <p>You have not setup a profile yet. Please add some info.</p>
                <Link to="create-profile">
                  <button className="glow-btn">Create a Profile</button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
