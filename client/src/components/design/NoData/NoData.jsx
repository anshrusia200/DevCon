import React from "react";
import NoDataGif from "../../../assets/NoData.gif";
const NoData = () => {
  return (
    <div className="no-data">
      <img src={NoDataGif} alt="" />
    </div>
  );
};

export default NoData;
