const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastNaame"]);

    
    res.status(200).json({ message : requests });
  } catch (error) {
    res.status(500).json({ message: "Server error " + error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.status(200).json({ message: connections });
  } catch (error) {
    res.status(500).json({ message: "Server error " + error.message });
  }
});

module.exports = userRouter;
