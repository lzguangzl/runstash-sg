import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material UI Icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// util
import TooltipButton from "../../util/TooltipButton";

// redux
import { connect } from "react-redux";
import { likeProfile, unlikeProfile } from "../../redux/actions/dataActions";

class LikeButton extends Component {
  likedProfile = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.profileId === this.props.profileId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeProfile = () => {
    this.props.likeProfile(this.props.profileId);
  };

  unlikeProfile = () => {
    this.props.unlikeProfile(this.props.profileId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <TooltipButton tip='Like'>
          <FavoriteBorder color='primary' />
        </TooltipButton>
      </Link>
    ) : this.likedProfile() ? (
      <TooltipButton tip='Undo like' onClick={this.unlikeProfile}>
        <FavoriteIcon color='primary' />
      </TooltipButton>
    ) : (
      <TooltipButton tip='Like' onClick={this.likeProfile}>
        <FavoriteBorder color='primary' />
      </TooltipButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeProfile: PropTypes.func.isRequired,
  unlikeProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { likeProfile, unlikeProfile };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
