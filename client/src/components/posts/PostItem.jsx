import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { readingTime } from "reading-time-estimator";
import { addLikes, removeLikes, deletePost } from "../../actions/post";
import { connect } from "react-redux";
import { TypographyStylesProvider } from "@mantine/core";
const PostItem = ({
  post: { imageUrl, title, date, text, user, avatar, _id, comments, likes },
  auth,
  addLikes,
  removeLikes,
  deletePost,
}) => {
  console.log(title);
  const handleDelete = () => {
    document.documentElement.scrollTop = 0;
    deletePost(post._id);
  };
  const blankImageUrl =
    "https://res.cloudinary.com/appcloudansh/image/upload/v1675093107/blogapp/Group_1_l70ltw.png";

  return (
    <div className="post">
      {/* {post ? ( */}
      <>
        <div className="poster">
          <img src={imageUrl || imageUrl} className="poster-img" />
        </div>
        <h2 className="post-title">{title}</h2>
        {/* <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: post.text }} />
          </TypographyStylesProvider> */}

        <span>
          {moment(date).format("MMM Do YYYY")} | {readingTime(text).text}
        </span>
        <div className="post-buttons">
          <Link to={`/profile/${user}`}>
            <div className="post-author">
              <img src={avatar} alt="" className="author-img" />
            </div>
          </Link>
          <Link to={_id}>
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
              onClick={(e) => addLikes(_id)}
            >
              <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
            </button>
            <button
              type="button"
              className="unlike btn"
              onClick={(e) => removeLikes(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
          </div>
          <Link to={_id}>
            <div className="comment-length">
              <i className="fa fa-comments-o" aria-hidden="true"></i>{" "}
              <span>{comments.length}</span>
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
      {/* ) : (<>Post Not Found</>
      )} */}
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
