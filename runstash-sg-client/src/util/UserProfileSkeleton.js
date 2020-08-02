import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

// Material UI
// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

// Material UI Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.userProfileTheme,
  username: {
    width: 60,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10,
  },
});

const profileSkeleton = (props) => {
  const { classes } = props;

  const content = (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='User profile' className='profile-image' />
        </div>
        <hr />
        <div className='profile-details'>
          <div className={classes.username}></div>
          <hr />
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <hr />
          <LocationOn color='primary' /> <span>Location</span>
          <hr />
          <LinkIcon color='primary' /> https://website.com
          <hr />
          <CalendarToday color='primary' /> <span>Joined date</span>
        </div>
      </div>
    </Paper>
  );

  return <Fragment>{content}</Fragment>;
};

profileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(profileSkeleton);
