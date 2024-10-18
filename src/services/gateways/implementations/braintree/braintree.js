const GatewayInterface = require("../../gateways.interface.js");
const BraintreePaymentService = require("./payment.service.js");

class Braintree extends GatewayInterface {
  processPayment = async function (paymentPayload) {
    return await BraintreePaymentService.processPayment(paymentPayload);
  };
}
module.exports = Braintree;
