import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_PROFILE,
  UNLIKE_PROFILE,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case LIKE_PROFILE:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            profileId: action.payload.profileId,
          },
        ],
      };
    case UNLIKE_PROFILE:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.profileId !== action.payload.profileId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
