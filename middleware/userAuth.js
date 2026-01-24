const jwt = require("jsonwebtoken");
const User = require("../config/models/user");


const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "Mahesh@123");
    const { userId }  = decoded;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }   
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { userAuth };
