const express = require("express");
const connectDb = require("./config/database");
const User = require("./config/models/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the DevTinder API");
});

app.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();
    
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
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
