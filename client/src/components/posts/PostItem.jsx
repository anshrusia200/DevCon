import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { readingTime } from "reading-time-estimator";
import { addLikes, removeLikes, deletePost } from "../../actions/post";
import { connect } from "react-redux";
import { TypographyStylesProvider } from "@mantine/core";
const PostItem = ({ post, auth, addLikes, removeLikes, deletePost }) => {
  // console.log(post);
  const handleDelete = () => {
    document.documentElement.scrollTop = 0;
    deletePost(post._id);
  };
  const imageUrl =
    "https://res.cloudinary.com/appcloudansh/image/upload/v1675093107/blogapp/Group_1_l70ltw.png";

  return (
    <div className="post">
      {post ? (
        <>
          <div className="poster">
            <img
              src={post.imageUrl || imageUrl}
              alt=""
              className="poster-img"
            />
          </div>
          <h2 className="post-title">{post.title}</h2>
          {/* <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: post.text }} />
          </TypographyStylesProvider> */}
          <span>
            {moment(post.date).format("MMM Do YYYY")} |{" "}
            {readingTime(post.text).text}
          </span>
          <div className="post-buttons">
            <Link to={`/profile/${post.user}`}>
              <div className="post-author">
                <img src={post.avatar} alt="" className="author-img" />
              </div>
            </Link>
            <Link to={post._id}>
              <div className="open-post">
                Open Post{" "}
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </div>
            </Link>
          </div>
          <div className="post-bottom">
            <div className="like-section">
              <button
                type="button"
                className="like btn"
                onClick={(e) => addLikes(post._id)}
              >
                <i className="fas fa-thumbs-up"></i>{" "}
                <span>{post.likes.length}</span>
              </button>
              <button
                type="button"
                className="unlike btn"
                onClick={(e) => removeLikes(post._id)}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
            <Link to={post._id}>
              <div className="comment-length">
                <i class="fa fa-comments-o" aria-hidden="true"></i>{" "}
                <span>{post.comments.length}</span>
              </div>
            </Link>
            {/* {!auth.loading && post.user === auth.user._id && (
              <div>
                <button onClick={(e) => handleDelete()} className="delete-post">
                  Delete
                </button>
              </div>
            )}*/}
          </div>
        </>
      ) : (
        <>Post Not Found</>
      )}
    </div>
  );
};

PostItem.propTypes = {
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLikes, removeLikes, deletePost })(
  PostItem
);
