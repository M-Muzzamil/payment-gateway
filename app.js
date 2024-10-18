const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();
const PATH_CONSTANTS = require("./src/constants/path.constants");
const errorHandler = require("./src/middleware/errorHandler");

// Setting up view engine
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'src/services/payment/views'),
  ]);

// Setting Up Application Environment

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup Routes
app.use(PATH_CONSTANTS.payment, require("./src/services/payment/routes"));
app.use(PATH_CONSTANTS.basePathPrefix, require("./src/routes/app.routes"));
app.use(errorHandler)
module.exports = app;
