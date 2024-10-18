const Braintree = require("./implementations/braintree/braintree");
const Paypal = require("./implementations/paypal/paypal");

class GatewayFactory {
  create(type) {
    switch (type) {
      case "BRAINTREE":
        return new Braintree();
      case "PAYPAL":
        return new Paypal();
      default:
        return new Error("payment gateway not found");
    }
  }
}

module.exports = GatewayFactory;
