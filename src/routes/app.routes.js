const express = require("express");

const router = express.Router();

router.get("/check/health", (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: "Application is working!",
    },
  });
});

module.exports = router;
