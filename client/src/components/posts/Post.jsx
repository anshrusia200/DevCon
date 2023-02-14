import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  add_comment,
  addLikes,
  removeLikes,
  delete_comment,
  getPostById,
} from "../../actions/post";
import Spinner from "../layout/Spinner/Spinner";
import moment from "moment";
import { readingTime } from "reading-time-estimator";
import { TypographyStylesProvider } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";

const Post = ({
  getPostById,
  add_comment,
  delete_comment,
  addLikes,
  removeLikes,
  auth,
  post: { post, loading },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getPostById(id);
  }, []);
  const [commentOpen, setCommentOpen] = useState(false);
  // const [comment, setComment] = useState("");
  // const initialValue = "<p>Enter Blog content </p>";

  const [commentValue, setCommentValue] = useState("");
  const handleDelete = (commentId) => {
    delete_comment(id, commentId);
  };
  const handleCommentModal = () => {
    setCommentOpen(!commentOpen);
  };
  const onChange = (commentValue) => {
    setCommentValue(commentValue);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const removedHtmlText = commentValue.replace(/(<([^>]+)>)/gi, "");
    const isEmpty =
      removedHtmlText === "" || removedHtmlText === "\n" ? true : false;
    console.log(removedHtmlText.length);
    console.log(removedHtmlText);
    if (!isEmpty) {
      const formData = {
        text: commentValue,
        name: post.name,
      };
      add_comment(id, formData);
      setCommentValue("");
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  const onClick = () => {
    console.log(isFullScreen);
    setIsFullScreen(!isFullScreen);
  };
  var styleObject = {};
  // useEffect(() => {
  //   console.log();
  //   if (isFullScreen) {
  //     styleObject = {
  //       width: "100vw",
  //       height: "100vh",
  //     };
  //   } else {
  //     styleObject = {
  //       width: "350px",
  //       height: "70vh",
  //     };
  //   }
  // }, [isFullScreen]);
  return (
    <section className="post-wrapper">
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <div className="comment-wrapper">
            <div className="comment-btn" onClick={handleCommentModal}>
              {!commentOpen ? (
                <i class="fa fa-comments-o" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times" aria-hidden="true"></i>
              )}
            </div>
            {commentOpen ? (
              <div
                className="comment-container"
                style={{
                  width: isFullScreen ? "95vw" : "350px",
                  marginRight: isFullScreen ? "1rem" : "0",
                  height: isFullScreen ? "80vh" : "70vh",
                  right: isFullScreen ? "0%" : "7%",
                }}
              >
                <h3 className="comment-head">
                  Comments ( {post.comments.length} ){" "}
                  <button className="full-screen" onClick={onClick}>
                    {!isFullScreen ? (
                      <i class="fa fa-expand" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-compress" aria-hidden="true"></i>
                    )}
                  </button>
                </h3>
                <form action="" onSubmit={onSubmit} className="comment-form">
                  <RichTextEditor
                    sx={{
                      width: "90%",
                      overflow: "auto",
                      margin: "10px auto",
                      maxHeight: "200px",
                    }}
                    controls={[
                      ["bold", "italic", "link", "codeBlock"],
                      ["sup", "sub"],
                    ]}
                    id="rte"
                    value={commentValue}
                    onChange={onChange}
                  />
                  <button type="submit" className="comment-submit">
                    Submit
                  </button>
                </form>
                {post.comments.length === 0 ? (
                  <div className="no-comment">
                    ✨Be the first one to comment
                  </div>
                ) : (
                  <div className="comments">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="comment">
                        <TypographyStylesProvider
                          sx={{
                            color: "#C1C2C5",
                            fontFamily: "Raleway, sans-serif",
                            wordBreak: "break-word",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: comment.text }}
                          />
                        </TypographyStylesProvider>
                        {comment.user === auth.user._id ? (
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="comment-delete-btn"
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="like-wrapper">
            <div className="like-tab">
              <button
                type="button"
                className="like btn"
                onClick={(e) => addLikes(post._id)}
              >
                <i className="fas fa-thumbs-up"></i>{" "}
                <span>{post.likes.length}</span>
              </button>
              |
              <button
                type="button"
                className="unlike btn"
                onClick={(e) => removeLikes(post._id)}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
          </div>
          <div className="post-container">
            <div className="post-top">
              <img src={post.avatar} alt="" className="author-img" />
              <div className="author-details">
                <div className="author">{post.name}</div>
                <div className="post-time">
                  {" "}
                  {moment(post.date).format("Do MMM, YYYY")}&nbsp; . &nbsp;
                  {readingTime(post.text).text}
                </div>
              </div>
            </div>
            <div className="post-content">
              {post.imageUrl ? (
                <div className="post-poster">
                  <img src={post.imageUrl} alt="" className="poster-display" />
                </div>
              ) : (
                <></>
              )}
              <div className="post-head">{post.title}</div>
              <div className="content-wrapper">
                <TypographyStylesProvider>
                  <div dangerouslySetInnerHTML={{ __html: post.text }} />
                </TypographyStylesProvider>
              </div>
            </div>
          </div>
          {/* <div>
            <h3>Comments</h3>
            <form action="" onSubmit={onSubmit}>
              <input
                type="text"
                name="comment"
                onChange={onChange}
                value={comment}
              />
              <button type="submit" disabled={comment ? false : true}>
                Submit
              </button>
            </form>
            {post.comments.length === 0 ? (
              <>Be the first one to comment</>
            ) : (
              <>
                {post.comments.map((comment) => (
                  <div key={comment._id}>
                    <p>{comment.text}</p>
                    {comment.user === auth.user._id ? (
                      <button onClick={() => handleDelete(comment._id)}>
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </>
            )}
          </div> */}
        </>
      )}
    </section>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  add_comment: PropTypes.func.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  delete_comment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostById,
  delete_comment,
  add_comment,
  addLikes,
  removeLikes,
})(Post);
