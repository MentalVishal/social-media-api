const Post = require("../models/Post");
const User = require("../models/User");

const postContent = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ content, author: req.userId });
    await post.save();

    // Here we are Updating the user's posts

    await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } });
    res.status(201).json({ message: "Content posted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This route is use for updating the post only the owner of the post can update the post

const updatePost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the authenticated user is the owner of the post

    if (post.author.toString() !== req.userId && !req.isAdmin) {
      throw new Error("You are not authorized to update this post");
    }
    post.content = content;
    await post.save();
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the authenticated user is the owner of the post or an admin

    if (post.author.toString() !== req.userId && !req.isAdmin) {
      throw new Error("You are not authorized to delete this post");
    }

    await Post.findByIdAndDelete({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postContent, updatePost, deletePost };
