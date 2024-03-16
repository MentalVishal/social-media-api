const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { register, login, getUsers } = require("./controllers/authController");
const authenticate = require("./middleware/authMiddleware");
const { Connection } = require("./db");
const {
  postContent,
  updatePost,
  deletePost,
} = require("./controllers/postController");
const {
  followUser,
  unfollowUser,
} = require("./controllers/followerController");
const getFeed = require("./controllers/feedController");
const {
  blacklistUser,
  removeUserFromBlacklist,
} = require("./controllers/adminController");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.get("/users", authenticate, getUsers);
app.post("/users/blacklist/:userId", authenticate, blacklistUser);
app.post("/users/unblacklist/:userId", authenticate, removeUserFromBlacklist);
app.post("/post", authenticate, postContent);
app.patch("/updatePost", authenticate, updatePost);
app.delete("/deletePost/:postId", authenticate, deletePost);
app.post("/follow/:userId", authenticate, followUser);
app.post("/unfollow/:userId", authenticate, unfollowUser);
app.get("/feed", authenticate, authenticate, getFeed);

app.use(
  "/graphql",
  authenticate,
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.port, async () => {
  try {
    await Connection;
    console.log("Connected to Database");
    console.log(`Running at port ${process.env.port}`);
  } catch (error) {
    console.log("Something Went Wrong");
  }
});
