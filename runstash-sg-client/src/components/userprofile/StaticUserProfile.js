import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// dayjs
import dayjs from "dayjs";

// Material UI
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

// Material UI Icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.userProfileTheme,
});

const StaticUserProfile = (props) => {
  const {
    classes,
    userProfile: { username, createdAt, imageUrl, website, bio, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={imageUrl} alt='User profile' className='profile-image' />
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
      </div>
    </Paper>
  );
};

StaticUserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticUserProfile);
