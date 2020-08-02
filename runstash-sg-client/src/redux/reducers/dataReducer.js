import {
  SET_PROFILES,
  SET_PROFILE,
  LOADING_DATA,
  LIKE_PROFILE,
  UNLIKE_PROFILE,
  DELETE_PROFILE,
  POST_PROFILE,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  profiles: [],
  profile: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case POST_PROFILE:
      return {
        ...state,
        profiles: [action.payload, ...state.profiles],
      };
    case LIKE_PROFILE:
    case UNLIKE_PROFILE:
      let likeIndex = state.profiles.findIndex(
        (profile) => profile.profileId === action.payload.profileId
      );
      state.profiles[likeIndex] = action.payload;
      if (state.profile.profileId === action.payload.profileId) {
        let tempComments = state.profile.comments;
        state.profile = action.payload;
        state.profile.comments = tempComments;
      }
      return {
        ...state,
      };
    case DELETE_PROFILE:
      let deleteIndex = state.profiles.findIndex(
        (profile) => profile.profileId === action.payload
      );
      state.profiles.splice(deleteIndex, 1);
      return { ...state };
    case SUBMIT_COMMENT:
      return {
        ...state,
        profile: {
          ...state.profile,
          comments: [action.payload, ...state.profile.comments],
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
