import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// Material UI icon
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// util
import TooltipButton from "../../util/TooltipButton";

// redux
import { connect } from "react-redux";
import { deleteProfile } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};

class DeleteProfile extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteProfile = () => {
    this.props.deleteProfile(this.props.profileId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <TooltipButton
          tip='Delete profile'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>
            Are you sure you want to delete this profile ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deleteProfile} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteProfile.protoTypes = {
  deleteProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
};

const mapActionsToProps = { deleteProfile };

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteProfile));
