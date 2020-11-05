import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      className={`bg-${alert.alertType}-200 border-${alert.alertType}-400 text-${alert.alertType}-700 px-12 py-3 rounded my-2 flex
        role="alert"`}
    >
      <p className="md:hidden">
        <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
      </p>
      <strong className="font-bold hidden md:inline-block">Alert!</strong>
      <span className="block sm:inline px-2">{alert.msg}</span>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
