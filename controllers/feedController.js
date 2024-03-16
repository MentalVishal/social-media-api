const User = require("../models/User");

const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("following")
      .populate("posts");
    const feedPosts = user.posts
      .concat(...user.following.map((u) => u.posts))
      .sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json({ feedPosts: feedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFeed;
