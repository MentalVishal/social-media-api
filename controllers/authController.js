const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

// This route is use for Register the user

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This route is use for login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.blacklisted) {
      throw new Error(
        "User is blacklisted. Please contact the administrator for assistance."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.secret_key,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({ msg: "Login Successfully", token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// This route is for getting all the data of Users along with their post following and followers.

const getUsers = async (req, res) => {
  try {
    const Users = await User.find()
      .populate("posts")
      .populate("following")
      .populate("followers");
    res.status(200).json({ Users: Users });
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

module.exports = { register, login, getUsers };
