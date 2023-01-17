import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <div
          className="alert-wrapper"
          key={alert.id}
          style={{ boxShadow: `0px 0 10px var(--${alert.alertType}-color)` }}
        >
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
