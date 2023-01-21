import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner/Spinner";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return <div></div>;
};

Posts.propTypes = {
  post: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
};

Posts.mapStateToProps = (state) => ({
  post: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
