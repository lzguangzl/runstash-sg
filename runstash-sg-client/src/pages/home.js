import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI
import Grid from "@material-ui/core/Grid";

// components
import Profile from "../components/profile/Profile";
import UserProfile from "../components/userprofile/UserProfile.js";
import ProfileSkeleton from "../util/ProfileSkeleton";

// redux
import { connect } from "react-redux";
import { getProfiles } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.data;
    let recentProfilesMarkup = !loading ? (
      profiles.map((profile) => (
        <Profile key={profile.profileId} profile={profile} />
      ))
    ) : (
      <ProfileSkeleton />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentProfilesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <UserProfile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getProfiles })(home);
