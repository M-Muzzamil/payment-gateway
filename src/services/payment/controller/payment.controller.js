const PaymentService = require("../service/payment.service");

const PaymentController = {
  handlePayment: async (req) => {
    try {
      const data = req.body;
      const payment = await PaymentService.makePayment(data);
      return payment;
    } catch (err) {
      return {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: "Bad Request",
        },
      };
    }
  },
};

module.exports = PaymentController;
