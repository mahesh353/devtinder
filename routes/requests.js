const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const User = require("../models/user");

const ConnnectionRequest = require("../models/connectionRequest");

const requestsRouter = express.Router();

requestsRouter.post(
  "/sendConnectionRequest/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const sender = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "ToUser is not found" });
      }

      //verify the status
      const validStatuses = ["ignored", "interested"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      if (toUser._id.equals(sender._id)) {
        return res.status(400).send("Connection request already sent");
      }

      // check if connection request is already exists

      const existingRequest = await ConnnectionRequest.findOne({
        $or: [
          { fromUserId: sender._id, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: sender._id },
        ],
      });

      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already sent" });
      }

      const connectionRequest = new ConnnectionRequest({
        toUserId: toUserId,
        fromUserId: sender._id,
        status: status.toLowerCase(),
      });

      await connectionRequest.save();

      res.status(200).json({ message: "Connection request sent successfully" });
    } catch (error) {
      res
        .status(500)
        .send("Error sending connection request: " + error.message);
    }
  },
);

module.exports = requestsRouter;
