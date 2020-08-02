import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({
  component: Component,
  user: { authenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AuthRoute);
