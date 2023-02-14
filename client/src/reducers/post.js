import {
  GET_POST,
  GET_POSTS,
  POSTS_ERROR,
  CLEAR_POST,
  UPDATE_LIKES,
  POST_CREATED,
  DELETE_POST,
  LOADING_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  NEXT_PAGE,
  ALL_POSTS,
  STATE_RESET,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
  allPosts: false,
  page: 1,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STATE_RESET:
      return (state = initialState);
    case LOADING_POST:
      return {
        ...state,
        loading: true,
      };
    case POST_CREATED:
      return {
        ...state,
        posts: payload.concat(state.posts),
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        error: {},
      };
    case GET_POSTS:
      return {
        ...state,
        posts: state.posts.concat(payload),
        loading: false,
      };
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case ALL_POSTS:
      return {
        ...state,
        allPosts: true,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: {
          ...state.post,
          likes: payload.likes,
        },
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload.comments },
        posts: state.posts.map((post) => {
          if (state.post._id == post._id) {
            return (state.post = payload.post);
          }
          return post;
        }),
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
