import axios from "axios";
import { setAlert } from "./alert";
// import { v2 as cloudinary } from "cloudinary";
import store from "../store";
import {
  GET_POSTS,
  GET_POST,
  POSTS_ERROR,
  CLEAR_POST,
  UPDATE_LIKES,
  DELETE_POST,
  POST_CREATED,
  LOADING_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  NEXT_PAGE,
  ALL_POSTS,
  STATE_RESET,
} from "./types";

export const loadingPosts = () => async (dispatch) => {
  dispatch({
    type: LOADING_POST,
  });
};

//get posts
export const getPosts = (page) => async (dispatch) => {
  try {
    // dispatch({
    //   type: CLEAR_POST,
    // });
    dispatch({
      type: LOADING_POST,
    });
    const res = await axios.get(`/api/posts?page=${page}`);
    // console.log(res.data);
    console.log("called from getPosts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    if (res.data.length < 6) {
      console.log(res.data);
      dispatch({
        type: ALL_POSTS,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const fetchMorePosts = () => async (dispatch) => {
  if (!store.getState().post.allPosts) {
    try {
      // dispatch({
      //   type: CLEAR_POST,
      // });
      dispatch({
        type: LOADING_POST,
      });
      console.log("loading called");
      const page = store.getState().post.page;
      const res = await axios.get(`/api/posts?page=${page + 1}`);
      if (res.data.length == 0 || res.data.length < 6) {
        console.log(res.data);
        dispatch({
          type: ALL_POSTS,
        });
      }
      if (res.data.length > 0) {
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        });
        dispatch({
          type: NEXT_PAGE,
        });
      }
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const getPostById = (post_id) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_POST,
    });
    dispatch({
      type: LOADING_POST,
    });
    const res = await axios.get(`/api/posts/${post_id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const removeLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
    dispatch({
      type: STATE_RESET,
    });
    dispatch(getPosts(1));
  } catch (err) {
    console.log(err);
  }
};

export const add_comment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  console.log(formData);
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, body, config);
    console.log(res.data);
    const current_comments = store.getState().post.post.comments.reverse();
    const final_comments = current_comments.concat(res.data);
    const post = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: ADD_COMMENT,
      payload: { comments: final_comments.reverse(), post: post.data },
    });

    console.log("sent");
  } catch (err) {
    console.log(err);
  }
};
export const delete_comment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    console.log("sent");
  } catch (e) {
    console.log(e);
  }
};

export const add_post = (formData) => async (dispatch) => {
  dispatch({
    type: LOADING_POST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/posts", body, config);

    dispatch(setAlert("Post Created", "success"));
    const res_array = [res.data];
    dispatch({
      type: POST_CREATED,
      payload: res_array,
    });
    dispatch({
      type: STATE_RESET,
    });
    console.log("sent");
  } catch (e) {
    dispatch(setAlert(e.response.statusText, "danger"));
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};
// export const imageUpload = async (image, publicId) => {
//   cloudinary.config({
//     cloud_name: "dlkk7djwt",
//     api_key: "686735253699914",
//     api_secret: "9HCYwuzp7EQCSh2MCAYLyFmguV4",
//   });
//   try {
//     const res = await cloudinary.uploader.upload(image, {
//       public_id: publicId,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
