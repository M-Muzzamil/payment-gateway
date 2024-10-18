const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const config = require("../../../../config/config");

const PaypalPaymentService = {
  getAccessToken: async () => {
    const { paypalBaseUrl, paypalClientId, paypalClientSecret } = config;
    const clientId = paypalClientId;
    const clientSecret = paypalClientSecret;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await axios({
      url: paypalBaseUrl + "/v1/oauth2/token",
      method: "post",
      data: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  },

  createPaypalOrder: async (paymenPayload, token) => {
    const { paypalBaseUrl } = config;
    const orderUrl = paypalBaseUrl + "/v2/checkout/orders";
    const payload = PaypalPaymentService.mapCreateOrderPayload(paymenPayload);
    try {
      const response = await axios({
        url: orderUrl,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "PayPal-Request-Id": uuidv4(),
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  processPayment: async (paymenPayload) => {
    try {
      const token = await PaypalPaymentService.getAccessToken();
      const createPaypalOrderResp =
        await PaypalPaymentService.createPaypalOrder(paymenPayload, token);
      const createServiceResponse = {
        code: 200,
        status_code: 200,
        data: {
          transactionId: createPaypalOrderResp?.id,
        },
      };
      return PaypalPaymentService.serviceResponse(createServiceResponse);
    } catch (e) {
      const createServiceResponse = {
        code: e?.response?.status,
        error_code: e?.response?.status,
        error: {
          message: e?.response?.data?.error,
          reason: JSON.stringify(e?.response?.data?.error_description),
        },
      };
      return PaypalPaymentService.serviceResponse(createServiceResponse);
    }
  },

  mapCreateOrderPayload: (paymenPayload) => {
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: paymenPayload.currency,
            value: paymenPayload.amount,
          },
        },
      ],
      payment_source: {
        card: {
          name: paymenPayload?.creditCard.cardHolderName,
          number: paymenPayload?.creditCard.number,
          expiry: `${paymenPayload?.creditCard.expirationYear}-${paymenPayload?.creditCard?.expirationMonth}`,
          security_code: paymenPayload?.creditCard.cvv,
        },
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

module.exports = PaypalPaymentService;
