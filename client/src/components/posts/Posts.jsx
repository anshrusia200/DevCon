import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, add_post, fetchMorePosts } from "../../actions/post";
import Skeleton from "../layout/Skeleton_loader/Skeleton";
import PostItem from "./PostItem";
import _, { map } from "underscore";

const Posts = ({
  getPosts,
  add_post,
  fetchMorePosts,
  post: { posts, allPosts, page, loading },
}) => {
  useEffect(() => {
    if (posts.length === 0) getPosts(page);
  }, []);
  const [scrollToTop, setScrollToTop] = useState(false);
  /******************************************************************
   * BELOW IS A COPY OF FETCH_MORE_POSTS THAT CAN ONLY BE CALLED ONCE *
   ******************************************************************/
  var fetchMoreOnlyOnce = _.once(() => fetchMorePosts());

  const handleScroll = async (e) => {
    const bottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (posts.length % 6 == 0 && !loading && bottom && !allPosts) {
      console.log("Called");
      await fetchMoreOnlyOnce();
    }
  };
  window.addEventListener("scroll", handleScroll);

  return (
    <section className="posts">
      <div className="posts-container">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      {allPosts ? (
        // || posts.length === 0
        <>You have reached the end. No more posts to view</>
      ) : (
        <Skeleton />
      )}
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  fetchMorePosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  add_post,
  fetchMorePosts,
})(Posts);
