import {
  SET_PROFILES,
  SET_PROFILE,
  LOADING_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  POST_PROFILE,
  LIKE_PROFILE,
  UNLIKE_PROFILE,
  DELETE_PROFILE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/profiles")
    .then((res) => {
      dispatch({ type: SET_PROFILES, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SET_PROFILES, payload: [] });
    });
};

// Get one profile
export const getProfile = (profileId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/profile/${profileId}`)
    .then((res) => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a profile
export const postProfile = (newProfile) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/profile", newProfile)
    .then((res) => {
      dispatch({
        type: POST_PROFILE,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Like a profile
export const likeProfile = (profileId) => (dispatch) => {
  axios
    .get(`/profile/${profileId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Unlike a profile
export const unlikeProfile = (profileId) => (dispatch) => {
  axios
    .get(`/profile/${profileId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Submit a comment
export const submitComment = (profileId, commentData) => (dispatch) => {
  axios
    .post(`/profile/${profileId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete Profile
export const deleteProfile = (profileId) => (dispatch) => {
  axios
    .delete(`/profile/${profileId}`)
    .then(() => {
      dispatch({ type: DELETE_PROFILE, payload: profileId });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get user data for user page
export const getUserData = (username) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_PROFILES,
        payload: res.data.profiles,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PROFILES,
        payload: [],
      });
    });
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
