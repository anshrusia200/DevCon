import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
const VectorImage = ({ auth: { user } }) => {
  const [color, setColor] = useState("#0e0e0e");
  const avatar = `https:${user && user.avatar}`;
  console.log(avatar);
  axios
    .get("https://api.sightengine.com/1.0/check.json", {
      params: {
        url: avatar,
        models: "properties",
        api_user: "1752450581",
        api_secret: "symQ3LBMtCubsug6t8NC",
      },
    })
    .then(function (response) {
      // on success: handle response
      console.log(response.data);
      // if(res)
      setColor(response.data.colors.dominant.hex);
    })
    .catch(function (error) {
      // handle error
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    });

  return (
    <div className="vector">
      <svg
        width="333"
        height="240"
        viewBox="0 0 115 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_10_2)">
          <path
            d="M3.49997 58C-5.69224e-06 103 34.5 79 59.5 43.5C96.2834 -8.73246 119 -7.41522 109.5 30.5"
            stroke={color}
            stroke-linecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_10_2"
            x="0.753342"
            y="0.552195"
            width="113.41"
            height="84.5234"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color={color} />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
VectorImage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(VectorImage);
