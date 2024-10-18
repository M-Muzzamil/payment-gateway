const braintree = require("braintree");
const config = require("../../../../config/config");

const BraintreePaymentService = {
  processPayment: async (paymenPayload) => {
    try {
      const {
        mode,
        braintreeMerchantId,
        braintreePublicKey,
        braintreePrivateKey,
      } = config;
      let braintreeGateway = new braintree.BraintreeGateway({
        environment:
          mode === "sandbox"
            ? braintree.Environment.Sandbox
            : braintree.Environment.Development,
        merchantId: braintreeMerchantId,
        publicKey: braintreePublicKey,
        privateKey: braintreePrivateKey,
      });

      const payload = BraintreePaymentService.mapPaymentPayload(paymenPayload);
      const paymentResp = await braintreeGateway.transaction.sale(payload);
      const createServiceResponse = {
        code: 200,
        status_code: 200,
        data: {
          transactionId: paymentResp?.transaction?.id,
        },
      };
      return BraintreePaymentService.serviceResponse(createServiceResponse);
    } catch (e) {
      const createServiceResponse = {
        code: 400,
        error_code: 400,
        error: {
          message: "Payment Failed",
          reason: "Braintree cannot proccess the request",
        },
      };
      return BraintreePaymentService.serviceResponse(createServiceResponse);
    }
  },

  mapPaymentPayload: (paymenPayload) => {
    const payload = {
      amount: paymenPayload?.amount,
      creditCard: {
        number: paymenPayload?.creditCard.number,
        expirationMonth: paymenPayload?.creditCard.expirationMonth,
        expirationYear: paymenPayload?.creditCard.expirationYear,
        cvv: paymenPayload?.creditCard.cvv,
        cardholderName: paymenPayload?.creditCard.cardHolderName,
      },
      options: {
        submitForSettlement: true,
      },
    };
    return payload;
  },
  serviceResponse: (object) => {
    return {
      code: object.code ?? "",
      status_code: object.status_code ?? "",
      error_code: object.error_code ?? "",
      error: object.error ?? {},
      data: object.data ?? "",
    };
  },
};

module.exports = BraintreePaymentService;
