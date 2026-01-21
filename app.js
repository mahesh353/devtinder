const express = require('express')
const app = express()

const connectDb = require('./config/database')

connectDb().then(() => {
  console.log('Connected to the database, starting the server...');
  app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
}).catch((err) => { console.log("Database connection error:", err); });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})