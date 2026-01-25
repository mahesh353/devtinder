const express = require('express');
const { userAuth } = require("../middleware/userAuth");
const User = require("../config/models/user");

const requestsRouter = express.Router();




requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const requestingUser = req.user;
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).send("Target user not found");
    }
    // Here you would typically add logic to create a connection request
    res
      .status(200)
      .send(
        "Connection request sent from " +
          requestingUser._id +
          " to " +
          targetUserId,
      );
  } catch (error) {
    res.status(500).send("Error sending connection request: " + error.message);
  }
});

module.exports = requestsRouter;