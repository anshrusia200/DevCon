import axios from "axios";
import { setAlert } from "../actions/alert";
import setAuthToken from "../utilities/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

/*************
 * LOAD USER *
 *************/

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: AUTH_ERROR });
  }
};
/************
 * REGISTER *
 ************/

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    dispatch({
      type: LOADING,
    });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch(setAlert("User Registered successfully", "success"));
      dispatch(loadUser());
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

/************
 * LOGIN *
 ************/

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  dispatch({
    type: LOADING,
  });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch(setAlert("User Login successful", "success"));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

/**********
 * LOGOUT *
 **********/

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
