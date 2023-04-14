import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useAsyncError } from "react-router-dom";
import moment from "moment";
import { deleteEducation } from "../../actions/profile";
import { deleteSinglePost, getCurrentUserPosts } from "../../actions/post";
import { DeleteModal } from "../layout/DeleteModal/DeleteModal";

const MyPosts = ({
  profile: { profile, myposts },
  getCurrentUserPosts,
  deleteSinglePost,
}) => {
  const [postId, setPostId] = useState("");
  const [deletePost, setDeletePost] = useState(false);
  useEffect(() => {
    console.log(profile.user._id);
    // myposts.length == 0 &&
    getCurrentUserPosts(profile.user._id);
  }, []);

  const handleClick = async (postId) => {
    setPostId(postId);
    setDeletePost(true);
  };
  const render_posts =
    myposts &&
    myposts.map((post, index) => (
      <tr key={post._id}>
        <td>{index + 1}</td>
        <td className="post-title-cell">{post.title}</td>
        <td>{post.visitCount}</td>
        <td>{post.likes.length}</td>
        <td>{moment(post.date).format("hh:mm a")}</td>
        <td>{moment(post.date).format("DD - MMM - YY")}</td>
        <td>
          <button
            onClick={() => handleClick(post._id)}
            className="post-control post-delete"
          >
            Delete Post
          </button>
        </td>
        <td>
          <button className="post-control">
            <Link to={"/posts/" + post._id}>Open Post</Link>
          </button>
        </td>
      </tr>
    ));
  return (
    <>
      <DeleteModal
        deleteItemId={postId}
        deleteFunction={deleteSinglePost}
        itemType={"Post"}
        visible={deletePost}
        visibleChange={setDeletePost}
      />
      <div className="profile-table" id="post-table">
        <h2 className="dash-table-head">
          Your Posts{" "}
          <button
            className="refresh-btn"
            onClick={() => getCurrentUserPosts(profile.user._id)}
          >
            {" "}
            <i className="fa fa-refresh"></i>{" "}
          </button>{" "}
        </h2>
        {myposts != undefined && myposts.length != 0 ? (
          <table className="dash-table">
            <thead>
              <tr>
                <th>S no.</th>
                <th>Title</th>
                <th>Visits</th>
                <th>Likes</th>
                <th>Time</th>
                <th>Date</th>
                <th>Control</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{render_posts}</tbody>
          </table>
        ) : (
          <p className="no-content">
            No posts yet. <Link to="/posts/write">Write one here</Link>
          </p>
        )}
      </div>
    </>
  );
};

MyPosts.propTypes = {
  getCurrentUserPosts: PropTypes.func.isRequired,
  deleteSinglePost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentUserPosts,
  deleteSinglePost,
})(MyPosts);
