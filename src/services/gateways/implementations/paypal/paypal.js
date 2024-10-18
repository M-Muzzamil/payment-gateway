const GatewayInterface = require("../../gateways.interface.js");
const PaypalPaymentService = require("./payment.service.js");

class Paypal extends GatewayInterface {
  processPayment = async function (paymentPayload) {
    return await PaypalPaymentService.processPayment(paymentPayload);
  };
}
module.exports = Paypal;
