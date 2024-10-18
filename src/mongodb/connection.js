const mongoose = require("mongoose");

const config = require("../config/config");
const { mongoUsername, mongoPassword, mongoCluster, mongoDbName } = config;
mongoose.connect(
  `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${mongoDbName}`,
  {
    family: 4,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MONGO_DB_CONNECTION_ERROR"));
db.once("open", function () {
  console.log("MONGO_DB_CONNECTION_SUCCESSFUL");
});

module.exports = db;
