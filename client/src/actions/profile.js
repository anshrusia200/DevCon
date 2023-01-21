import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.msg, status: err.response.status },
    });
  }
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.msg, status: err.response.status },
    });
  }
};

// get a single user profile

export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.msg, status: err.response.status },
    });
  }
};

// get github repos

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.msg, status: err.response.status },
    });
  }
};

// const navigate = useNavigate();
export const createNewProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(!edit ? "Profile Created" : "Profile Updated", "success")
      );
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  };

export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added", "success"));
  } catch (e) {
    console.log(e);
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "deleted"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added", "success"));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "deleted"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  const res = await axios.delete("api/profile");
  try {
    localStorage.removeItem("token");
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: ACCOUNT_DELETED,
    });
    dispatch(setAlert("Account deleted permanently"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};
