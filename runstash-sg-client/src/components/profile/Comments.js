import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// dayjs
import dayjs from "dayjs";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.formTheme,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((cmt, index) => {
          const { comment, createdAt, userImage, username } = cmt;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt='comment'
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid container sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${username}`}
                        color='primary'
                      >
                        {username}
                      </Typography>
                      <Typography variant='body2' color='secondary'>
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant='body1'>{comment}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
