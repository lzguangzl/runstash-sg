import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// dayjs
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import { getProfile, clearErrors } from "../../redux/actions/dataActions";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// Material UI Icon
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

// util
import TooltipButton from "../../util/TooltipButton";

// components
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = (theme) => ({
  ...theme.formTheme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class ProfileDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { username, profileId } = this.props;
    const newPath = `/user/${username}/profile/${profileId}`;

    if (oldPath === newPath) {
      oldPath = `/user/${username}`;
    }
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getProfile(this.props.profileId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      profile: {
        profileId,
        distance,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        username,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${username}`}
          >
            @{username}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography color='textSecondary' variant='body2'>
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{distance} km</Typography>
          <LikeButton profileId={profileId} />
          <span>{likeCount} Likes</span>
          <TooltipButton tip='Comments'>
            <ChatIcon color='primary' />
          </TooltipButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm profileId={profileId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <TooltipButton
          tip='Expand profile'
          onClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color='primary' />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <TooltipButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </TooltipButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ProfileDialog.propTypes = {
  getProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.data.profile,
  UI: state.UI,
});

const mapActionsToProps = { getProfile, clearErrors };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProfileDialog));
