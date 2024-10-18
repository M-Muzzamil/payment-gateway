const PAYMENT_CONSTANTS = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  AMEX: "AMEX",
  USD: "USD",
  EUR: "EUR",
  THB: "THB",
  HKD: "HKD",
  SGD: "SGD",
  AUD: "AUD",
};

PAYMENT_CONSTANTS.VISA_VALIDATOR = {
  type: PAYMENT_CONSTANTS.VISA,
  pattern: /^4/,
  validLength: [13, 16],
};

PAYMENT_CONSTANTS.MASTERCARD_VALIDATOR = {
  type: PAYMENT_CONSTANTS.MASTERCARD,
  pattern: /^(5[1-5]|2[2-7])/,
  validLength: [16],
};

PAYMENT_CONSTANTS.AMEX_VALIDATOR = {
  type: PAYMENT_CONSTANTS.AMEX,
  pattern: /^3[47]/,
  validLength: [15],
};
PAYMENT_CONSTANTS.CURRENCIES = [
  PAYMENT_CONSTANTS.USD,
  PAYMENT_CONSTANTS.EUR,
  PAYMENT_CONSTANTS.THB,
  PAYMENT_CONSTANTS.HKD,
  PAYMENT_CONSTANTS.SGD,
  PAYMENT_CONSTANTS.AUD,
];
module.exports = PAYMENT_CONSTANTS;