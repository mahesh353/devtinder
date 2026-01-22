const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emailId: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String },
  age: { type: Number, min: 18},
  gender: { type: String, validate: function(v) { if (["male", "female", "other"].includes(v)) return true; return false; } },
  bio: { type: String, default: "This is default Bio" },
  profilePicture: { type: String },
  skills: { type: [String] }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
