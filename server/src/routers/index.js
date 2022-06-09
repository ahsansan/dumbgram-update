const express = require("express");

const router = express.Router();

// Controller
const { register, login, checkAuth } = require("../controllers/auth");
const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  followers,
  followings,
  followByFollowers,
  addFollow,
  unfollow,
} = require("../controllers/user");
const {
  addFeed,
  deleteFeed,
  followingFeeds,
  feeds,
  likeFeed,
  commentsFeed,
  addComment,
  getFeed,
  getLike,
  detailFeed,
} = require("../controllers/feed");
const { addChat, getMessage } = require("../controllers/message");
const { addNotif, getNotif } = require("../controllers/notification");

// Middleware
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Route
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, uploadFile("image"), editUser);
router.delete("/user/:id", deleteUser);
router.get("/feedscount/:id", getFeed);
router.get("/followers/:id", followers);
router.get("/followings/:id", followings);
router.get("/follow/:id", followByFollowers);
router.delete("/unfollow/:id", unfollow);
router.patch("/follow", addFollow);
router.post("/feed", auth, uploadFile("fileName"), addFeed);
router.get("/feed/:id", auth, followingFeeds);
router.delete("/feed/:id", auth, deleteFeed);
router.get("/detail-feed/:id", detailFeed);
router.get("/feeds", auth, feeds);
router.get("/like/:id", getLike);
router.post("/like", auth, likeFeed);
router.get("/comment/:id", auth, commentsFeed);
router.post("/comment", auth, addComment);
router.post("/chat/:id", auth, addChat);
router.get("/chat/:id", auth, getMessage);
router.post("/notif", auth, addNotif);
router.get("/notif/:id", getNotif);

module.exports = router;
