import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// components
import Profile from "../components/profile/Profile";

// Material UI
import Grid from "@material-ui/core/Grid";

// redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

// components
import StaticUserProfile from "../components/userprofile/StaticUserProfile";
import ProfileSkeleton from "../util/ProfileSkeleton";
import UserProfileSkeleton from "../util/UserProfileSkeleton";

class user extends Component {
  state = {
    userProfile: null,
    profileIdParam: null,
  };
  componentDidMount() {
    const username = this.props.match.params.username;
    const profileId = this.props.match.params.profileId;

    if (profileId) {
      this.setState({ profileIdParam: profileId });
    }
    this.props.getUserData(username);
    axios
      .get(`/user/${username}`)
      .then((res) => {
        this.setState({ userProfile: res.data.user });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { profiles, loading } = this.props.data;
    const { profileIdParam } = this.state;
    const profileMarkup = loading ? (
      <ProfileSkeleton />
    ) : profiles.length === 0 ? (
      <p>No profile from this user</p>
    ) : !profileIdParam ? (
      profiles.map((profile) => (
        <Profile key={profile.profileId} profile={profile} />
      ))
    ) : (
      profiles.map((profile) => {
        if (profile.profileId !== profileIdParam) {
          return <Profile key={profile.profileId} profile={profile} />;
        } else {
          return (
            <Profile key={profile.profileId} profile={profile} openDialog />
          );
        }
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {profileMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.userProfile === null ? (
            <UserProfileSkeleton />
          ) : (
            <StaticUserProfile userProfile={this.state.userProfile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
