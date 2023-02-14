const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
/************
 * ADD POST *
 ************/

const posts_validations = [
  check("title", "Title is required").notEmpty(),
  check("text", "Text is required").notEmpty(),
];

// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
//       return cb(new Error("Please upload a jpg or png"));
//     }
//     cb(undefined, true); // cb --> callback --> first argument is whether there is an error and second if is it success
//   },
// });

// Configuration

router.post(
  "/",
  auth,
  // upload.single("poster"),
  posts_validations,
  async (req, res) => {
    // console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // const buffer = await sharp(req.file.buffer)
      //   .resize({ width: 800, height: 250 })
      //   .png()
      //   .toBuffer();

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        // poster: poster_url,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
);

/*****************
 * GET ALL POSTS *
 *****************/

router.get("/", auth, async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 5;
    const posts = await Post.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(posts);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Server Error please check the console");
  }
});

/*********************
 * OPEN SINGLE POSTS *
 *********************/

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.json(post);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Server Error please check the console");
  }
});

/*****************
 * DELETE A POST *
 *****************/
cloudinary.config({
  cloud_name: "appcloudansh",
  api_key: "686735253699914",
  api_secret: "9HCYwuzp7EQCSh2MCAYLyFmguV4",
});
router.delete("/:post_id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.post_id)) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const id = req.params.post_id.toString();
    const post = await Post.findById(id);
    const img_url = post.imageUrl;
    const contents = img_url.split("/");
    const image_id = contents[contents.length - 1].split(".")[0];
    const public_id = contents[contents.length - 2] + "/" + image_id;
    console.log(public_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Check whether the user is deleting the post is also the owner of the post

    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete the post" });
    }
    await post.remove();
    cloudinary.uploader
      .destroy(public_id)
      .then((res) => console.log(res, "+"))
      .catch((e) => console.log(e, "-"));

    res.json({ msg: "post deleted" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Server Error please check the console");
  }
});

/***************
 * LIKE A POST *
 ***************/

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if a user liked the post once or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    return res.json(post.likes);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json("Server Error please check the console");
  }
});

/*****************
 * UNLIKE A POST *
 *****************/

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Check if a user liked the post once or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
    } else {
      return res.status(400).json({ msg: "Post not liked" });
    }

    await post.save();
    return res.json(post.likes);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server Error please check the console");
  }
});

/***********************
 * ADD COMMENT ON POST *
 ***********************/

const comment_validations = [check("text", "Text is required")];

router.post(
  "/comment/:post_id",
  auth,
  comment_validations,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      console.log(post.comments[0]);
      res.json(post.comments[0]);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
);

/****************************
 * REMOVE YOUR COMMENT FROM POST *
 ****************************/

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.post_id)) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.comment_id)) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    const post = await Post.findById(req.params.post_id.toString());

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (comment === undefined) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    // Check whether the user is deleting the post is alsoxthe owner of the post

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete the comment" });
    }
    await comment.remove();
    await post.save();
    return res.json({ msg: "Comment deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server Error please check the console");
  }
});

module.exports = router;
