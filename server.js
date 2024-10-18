// server.js
"use strict";

// Importing Dependencies
const app = require("./app");
const dotenv = require("dotenv");
const process = require("process");
require("./src/mongodb/connection");

// Setting Up ENV File Environment
dotenv.config();

// Configuring Listener Port
const PORT = process.env.PORT || 3000;

// Initializing Server Listener (Express JS)
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Payment Gateway App Crash ", err);
});

// Export the server instance for testing
module.exports = { app, server };
