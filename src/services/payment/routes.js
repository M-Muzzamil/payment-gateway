const express = require("express");
const { validate } = require("express-validation");
const PaymentController = require("./controller/payment.controller");
const paymentReqBodySchema = require("./validator/payment.validator");
const router = express.Router();

router.get("/form", async (req, res) => {
  res.render("paymentForm", { error: null, data: null });
});

router.post("/", validate(paymentReqBodySchema), async (req, res) => {
  const response = await PaymentController.handlePayment(req);
  res.status(response?.code).json(response);
});

module.exports = router;
