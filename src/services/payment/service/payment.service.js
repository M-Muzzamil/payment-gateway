const GatewayFactory = require("../../gateways/gateways.factory");
const OrderDetails = require("../schema/orderDetails.schema");
const PaymentHelpers = require("../utils/payment.helpers");

const PaymentService = {
  addOrderDetailsInDb: async (orderPayload, gatewayRespData) => {
    const data = {
      transactionId: gatewayRespData?.data?.transactionId,
      amount: orderPayload?.amount,
      currency: orderPayload?.currency,
      customerName: orderPayload?.customerName,
      paymentSuccess: gatewayRespData?.code === 200,
    };

    await OrderDetails.create(data);
  },

  makePayment: async (data) => {
    const {
      amount,
      currency,
      customerName,
      cardHolderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    } = data;
    if (!PaymentHelpers.isValidExpiry(+expirationYear, +expirationMonth)) {
      return {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: "Invalid Expiry Date",
        },
      };
    }

    const paymentData = {
      amount,
      currency,
      customerName,
      creditCard: {
        cardHolderName,
        number: cardNumber,
        expirationMonth,
        expirationYear,
        cvv,
      },
    };
    const cardType = PaymentHelpers.getCardType(cardNumber);
    if (!cardType) {
      return {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: "Card type not supported",
        },
      };
    }
    const { paymentGateway, err } = PaymentHelpers.getPaymentGateway(
      cardType,
      currency
    );

    if (err) {
      return {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: err,
        },
      };
    }
    try {
      const gateway = new GatewayFactory().create(paymentGateway);
      const resp = await gateway.processPayment(paymentData);
      await PaymentService.addOrderDetailsInDb(paymentData, resp);
      return resp;
    } catch (e) {
      return {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: "Payment method not supported",
        },
      };
    }
  },
};

module.exports = PaymentService;
