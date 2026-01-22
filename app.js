const express = require("express");
const bcrypt = require("bcrypt");

const connectDb = require("./config/database");
const User = require("./config/models/user");


const app = express();

app.use(express.json());

app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.find({ emailId: emailId });
    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving user: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error retrieving feeds: " + error.message);
  }
});

app.post("/signup", async (req, res) => {
  try {

    const { firstName, lastName, emailId, password, age, gender, skills } = req.body;

    // encrypt the password

    var encryptedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
      age,
      gender,
      skills
    });

    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
});


app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;   
  try {
    const user = await User.findOne({ emailId: emailId });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }   
    } else {
      res.status(404).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  try {

    const ALLOWED_UPDATES = [
      "password",
      "age",
      "gender",
      "bio",
      "skills",
      "profilePicture"];

    const isValidOperation = Object.keys(updates).every((update) =>
      ALLOWED_UPDATES.includes(update)
    );
    
    if (!isValidOperation) {
      throw new Error("Invalid updates!");
    }


    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, runValidators: true
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

connectDb()
  .then(() => {
    console.log("Connected to the database, starting the server...");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
