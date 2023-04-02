import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  PASS_EMAIL_SENT,
  PASS_RESET,
  PASS_RESET_FAIL,
  DRAFT_SAVED,
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case DRAFT_SAVED:
      return {
        ...state,
        user: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case ACCOUNT_DELETED:
    case PASS_EMAIL_SENT:
    case PASS_RESET:
    case PASS_RESET_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        profile: null,
        user: null, // check
      };

    default:
      return state;
  }
}
