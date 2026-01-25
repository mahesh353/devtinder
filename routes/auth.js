const express = require("express");
const User = require("../config/models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;

    // encrypt the password

    var encryptedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
      age,
      gender,
      skills,
    });

    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await user.getJWTToken();

        res.cookie("token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        });
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(404).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error while loggin in user: " + error.message);
  }
});

module.exports = authRouter;
