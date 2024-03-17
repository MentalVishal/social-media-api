const User = require("../models/User");

const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: "following",
        populate: { path: "posts" },
      })
      .populate("posts");

    // Extracting posts from the user's following
    const followingPosts = user.following.reduce((acc, followingUser) => {
      acc.push(...followingUser.posts);
      return acc;
    }, []);

    // Combining user's posts and following posts
    const allPosts = user.posts.concat(followingPosts);

    // Sorting all posts by createdAt
    const feedPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ feedPosts: feedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFeed;
