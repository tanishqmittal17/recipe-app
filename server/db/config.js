const mongoose = require("mongoose");
require("dotenv").config(); // Ensure this is here in config.js too (optional if already called in index.js)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
