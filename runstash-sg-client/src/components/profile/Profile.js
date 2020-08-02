import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Material UI Icon
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";

// util
import TooltipButton from "../../util/TooltipButton";

// components
import DeleteProfile from "../profile/DeleteProfile";
import ProfileDialog from "../profile/ProfileDialog";
import LikeButton from "../profile/LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Profile extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      profile: {
        distance,
        createdAt,
        userImage,
        username,
        profileId,
        likeCount,
        commentCount,
      },
      user: { authenticated, credentials },
    } = this.props;

    const deleteButton =
      authenticated && username === credentials.username ? (
        <DeleteProfile profileId={profileId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='User Profile Image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/user/${username}`}
            color={"primary"}
          >
            {username}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{distance} km</Typography>
          <LikeButton profileId={profileId} />
          <span>{likeCount} Likes</span>
          <TooltipButton tip='comments'>
            <ChatIcon color='primary' />
          </TooltipButton>
          <span>{commentCount} Comments</span>
          <ProfileDialog
            profileId={profileId}
            username={username}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Profile));
