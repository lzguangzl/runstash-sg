import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

// redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.formTheme,
});

class CommentForm extends Component {
  state = {
    comment: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ comment: "" });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.profileId, {
      comment: this.state.comment,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='comment'
            type='text'
            label='Comment on profile'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.comment}
            onChange={this.handleChange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
  authenticated: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

const mapActionsToProps = { submitComment };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
