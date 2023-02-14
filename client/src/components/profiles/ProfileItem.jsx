import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: { user, status, company, location, skills },
}) => {
  // console.log(user);
  return (
    <div className="profile">
      {user ? (
        <>
          <div className="profile-left">
            <img src={user.avatar} alt="User-profile" className="profile-img" />
          </div>
          <div className="profile-right">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-company">
              {status} {company && <span> at {company}</span>}
            </p>
            {/* <p>{location && <span>{location}</span>}</p> */}
            <Link to={`/profile/${user._id}`}>View Profile</Link>
          </div>
          {/* <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="">
                <i className="fas fa-check"></i>
                {skill}
              </li>
            ))}
          </ul> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
