const BRAINTREE_CONSTANTS = require("../constants/braintree.constant");
const PAYMENT_CONSTANTS = require("../constants/payment.constant");
const PAYPAL_CONSTANTS = require("../constants/paypal.constant");

const PaymentHelpers = {
  getCardType: (number) => {
    const cardNum = number.toString();

    const cardTypes = [
      PAYMENT_CONSTANTS.VISA_VALIDATOR,
      PAYMENT_CONSTANTS.MASTERCARD_VALIDATOR,
      PAYMENT_CONSTANTS.AMEX_VALIDATOR,
    ];

    // Loop through cardTypes to match pattern and validate length
    for (const card of cardTypes) {
      if (
        card.pattern.test(cardNum) &&
        card.validLength.includes(cardNum.length)
      ) {
        return card.type;
      }
    }

    return null;
  },

  getPaymentGateway: (cardType, currency) => {
    if (!cardType) {
      return {
        paymentGateway: null,
        err: "Invalid card number",
      };
    }
    if (!currency || PAYMENT_CONSTANTS.CURRENCIES.indexOf(currency) === -1) {
      return {
        paymentGateway: null,
        err: "Currency type not supported",
      };
    }
    if (cardType === PAYMENT_CONSTANTS.AMEX) {
      if (currency === PAYMENT_CONSTANTS.USD) {
        return PAYPAL_CONSTANTS.PAYPAL;
      }
      return {
        paymentGateway: null,
        err: "AMEX is possible to use only for USD",
      };
    }
    if (PAYPAL_CONSTANTS.CURRENCIES.indexOf(currency) >= 0) {
      return { paymentGateway: PAYPAL_CONSTANTS.PAYPAL, err: null };
    }
    return { paymentGateway: BRAINTREE_CONSTANTS.BRAINTREE, err: null };
  },

  isValidExpiry: (expirationYear, expirationMonth) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (expirationYear > currentYear) {
      return true;
    }
    if (expirationYear === currentYear && expirationMonth >= currentMonth) {
      return true;
    }
    return false;
  },
};

module.exports = PaymentHelpers;
