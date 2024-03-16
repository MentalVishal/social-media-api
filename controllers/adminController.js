const User = require("../models/User");

// Endpoint to blacklist a user
const blacklistUser = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can blacklist users" });
    }

    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the blacklisted field to true
    user.blacklisted = true;
    await user.save();

    res.status(200).json({ message: "User blacklisted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to remove user from blacklist
const removeUserFromBlacklist = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can remove users from blacklist" });
    }

    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the blacklisted field to false
    user.blacklisted = false;
    await user.save();

    res
      .status(200)
      .json({ message: "User removed from blacklist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { blacklistUser, removeUserFromBlacklist };
