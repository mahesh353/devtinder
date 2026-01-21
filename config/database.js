const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://maheshradheshyampatil353_db_user:TTH2oPSz3QtoXmM5@maheshnamastenode.pvysivz.mongodb.net/devTinder";

const connectDb = async () => {
  await mongoose
    .connect(dbURI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection error:", err));
};

module.exports = connectDb;
