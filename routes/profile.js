const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const profileRouter = express.Router();


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send("Profile data for token: " + user);
  } catch (error) {
    res.status(500).send("Error retrieving profile: " + error.message);
  }
});

module.exports = profileRouter;