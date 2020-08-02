import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// components
import EditUserProfile from "./EditUserProfile.js";
import UserProfileSkeleton from "../../util/UserProfileSkeleton";

// util
import TooltipButton from "../../util/TooltipButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import { Paper, Typography } from "@material-ui/core";

// Material UI Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.userProfileTheme,
});

class UserProfile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { username, createdAt, imageUrl, bio, website, location },
        loading,
      },
    } = this.props;

    let userProfileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img
                src={imageUrl}
                alt='User profile'
                className='profile-image'
              />
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={this.handleImageChange}
              />
              <TooltipButton
                tip='Edit profile picture'
                onClick={this.handleEditPicture}
                btnClassName='button'
              >
                <EditIcon color='primary' />
              </TooltipButton>
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/user/${username}`}
                color='primary'
                variant='h5'
              >
                @{username}
              </MuiLink>
              <hr />
              {bio && <Typography variant='body2'>{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color='primary' /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon />{" "}
                  <a href={website} target='_blank' rel='noopener noreferrer'>
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color='primary' />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <TooltipButton tip='Logout' onClick={this.handleLogout}>
              <KeyboardReturn color='primary' />
            </TooltipButton>
            <EditUserProfile />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <UserProfileSkeleton />
    );

    return userProfileMarkup;
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(UserProfile));
