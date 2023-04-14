import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner/Spinner";
import PropTypes from "prop-types";
import VectorImage from "../design/VectorImage/VectorImage";
import Experience from "./Experience";
import Education from "./Education";
import DashboardOptions from "./DashboardOptions";
import MyPosts from "./MyPosts";
import { DeleteModal } from "../layout/DeleteModal/DeleteModal";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    console.log("Profile loaded");
    if (profile === null) {
      getCurrentProfile();
    }
  }, []);

  const visibleModal = () => {
    setDeleteModal(true);
  };

  return (
    <div className="main">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <DeleteModal
            deleteItemId={user._id}
            deleteFunction={deleteAccount}
            itemType={"Account"}
            visible={deleteModal}
            visibleChange={setDeleteModal}
          />
          {!loading && profile !== null ? (
            <div className="dashboard">
              <div className="dash-top">
                <div className="dash-profile">
                  <img src={user && user.avatar} alt="User Profile Image" />
                </div>
                <DashboardOptions />
              </div>
              <div className="dash-center">
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
              </div>
              <div className="dash-bottom">
                <MyPosts />
              </div>
              <div className="delete-profile">
                <button
                  onClick={() => visibleModal()}
                  className="post-control delete-acc post-delete"
                >
                  Delete Account
                </button>
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
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
