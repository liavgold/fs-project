const Post = require("../models/posts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addPost = async (req, res, next) => {
  const { post } = req.body;
  console.log(`this is the post: ${post}`);
  //console.log(req.userId);
  if (
    !post.title ||
    post.title.length === 0 ||
    !post.content ||
    post.content.length === 0
  )
  return res.status(400).json({msg:"missing params"})
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
  console.log(`new Post request by userID: ${req.userId}`);
  res.json({ posts });
};
