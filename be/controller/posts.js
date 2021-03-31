const Post = require("../models/posts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addPost = async (req, res, next) => {
  const { post } = req.body;
  console.log(req.userId);
  const createPost = new Post({ ...post, creator: req.userId });
  const createdPost = await createPost.save();
  res.json({
    user: {
      ...createdPost._doc,
      creator: createdPost._doc.creator.toString(),
      _id: createPost._doc._id.toString(),
    },
  });
};

exports.getPosts = async (req, res, next) => {
  const creator = req.userId;
  const posts = await Post.find({ creator });

  if (!posts) {
    res.json({ msg: `No posts found` });
    return;
  }
  res.json({ posts });
};
