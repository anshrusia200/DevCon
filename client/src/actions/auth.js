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
  CLEAR_POSTS,
  PASS_EMAIL_SENT,
  PASS_RESET,
  PASS_RESET_FAIL,
  DRAFT_SAVED,
  STATUS_ACTIVE,
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
      dispatch({
        type: REGISTER_SUCCESS,
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
    console.log(err);
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

export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  if (email) {
    dispatch({
      type: LOADING,
    });
    try {
      const res = await axios.post("/api/auth/forgot-password", body, config);
      console.log(res);

      dispatch(
        setAlert("Password reset link sent. Please check email", "success")
      );
      dispatch({
        type: PASS_EMAIL_SENT,
      });
    } catch (err) {
      console.log(err);
      const error = err.response.data;
      dispatch(setAlert(error, "danger"));
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } else {
    dispatch(setAlert("Email not provided", "danger"));
  }
};

export const resetPassword = (userId, token, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    userId: userId,
    token: token,
    password: password,
  });
  dispatch({
    type: LOADING,
  });
  try {
    const user = await axios.post("/api/auth/reset-password", body, config);
    dispatch({
      type: PASS_RESET,
    });
    dispatch(
      setAlert("Password reset success. Please continue to login.", "success")
    );
  } catch (err) {
    dispatch(setAlert("Invalid reset request"));
    dispatch({
      type: PASS_RESET_FAIL,
    });
  }
};

export const postDraft = (title, textValue) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    title: title,
    text: textValue,
  });

  try {
    const res = await axios.put("/api/users/draft", body, config);
    console.log(res);
    dispatch({
      type: DRAFT_SAVED,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch(setAlert(e.response.statusText, "primary"));
    // dispatch({
    //   type: POSTS_ERROR, //draft error
    //   payload: { msg: e.response.statusText, status: e.response.status },
    // });
  }
};

export const makeStatusActive = (verifyCode) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify({
    token: verifyCode,
  });
  console.log(body);
  try {
    const res = await axios.post("/api/auth/verify-email", body, config);
    dispatch({
      type: STATUS_ACTIVE,
    });
    dispatch(setAlert("Email verification successful", "success"));
    return res.data;
  } catch (error) {
    dispatch(setAlert("Link is invalid", "danger"));
  }
};

export const resendVerificationEmail = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/resend-email");
    dispatch(setAlert("Email sent", "success"));
  } catch (error) {
    dispatch(setAlert("Error sending email"));
  }
};

/**********
 * LOGOUT *
 **********/

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  return;
};
