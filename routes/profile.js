const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const { validateUpdateProfile } = require("../utils/validation");
const brcrypt = require("bcrypt");

const profileRouter = express.Router();


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send("Profile data for token: " + user);
  } catch (error) {
    res.status(500).send("Error retrieving profile: " + error.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    //validate the incoming data

    if (!validateUpdateProfile(req)){
        return res.status(400).send("Invalid updates!");
    }
    const user = req.user;
    const updates = req.body;
    Object.assign(user, updates);
    await user.save();
    res.status(200).send("Profile updated successfully");
  } catch (error) {
    res.status(500).send("Error updating profile: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    const passwordChange = await brcrypt.compare(oldPassword, user.password);

    if (passwordChange === false) {
      return res.status(400).send("Old password is incorrect");
    }
    user.password = await brcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send("Password changed successfully");
  } catch (error) {
    res.status(500).send("Error changing password: " + error.message);
  }
});

module.exports = profileRouter;