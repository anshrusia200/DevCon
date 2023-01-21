import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: { user, status, company, location, skills },
}) => {
  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <img src={user.avatar} alt="User-profile" />
          <div>
            <h2>{user.name}</h2>
            <p>
              {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${user._id}`}>View Profile</Link>
          </div>
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="">
                <i className="fas fa-check"></i>
                {skill}
              </li>
            ))}
          </ul>
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
