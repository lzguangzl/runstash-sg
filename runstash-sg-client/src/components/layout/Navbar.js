import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI Icon
import HomeIcon from "@material-ui/icons/Home";

// redux
import { connect } from "react-redux";

// util
import TooltipButton from "../../util/TooltipButton";

// component
import PostProfile from "../profile/PostProfile";
import Notifications from "./Notifications";

const styles = (theme) => ({
  ...theme.navbarTheme,
});

class Navbar extends Component {
  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Typography variant='h6' className={classes.title} noWrap>
            RunStash
          </Typography>
          {authenticated ? (
            <div className='nav-container'>
              <PostProfile />
              <Link to='/'>
                <TooltipButton tip='Home'>
                  <HomeIcon />
                </TooltipButton>
              </Link>
              <Notifications />
            </div>
          ) : (
            <div className='nav-container'>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
