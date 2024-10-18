const Joi = require("joi");

const paymentReqBodySchema = {
  body: Joi.object({
    amount: Joi.string()
      .pattern(/^\d+(\.\d{1,2})?$/)
      .required()
      .messages({
        "string.pattern.base":
          "Amount must be a valid decimal number with up to 2 decimal places.",
      }),
    currency: Joi.string()
      .valid("USD", "EUR", "THB", "HKD", "SGD", "AUD")
      .required()
      .messages({
        "any.only":
          "Currency must be one of the following: USD, EUR, THB, HKD, SGD, AUD.",
      }),
    customerName: Joi.string().required().messages({
      "string.empty": "Card holder name is required.",
    }),
    cardHolderName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Card holder name is required.",
      "string.min": "Card holder name must be at least 3 characters long.",
    }),
    cardNumber: Joi.string().creditCard().required().messages({
      "string.creditCard": "Credit card number must be valid.",
    }),
    expirationMonth: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])$/)
      .required()
      .messages({
        "string.pattern.base": "Expiration month must be a valid month",
      }),
    expirationYear: Joi.string()
      .pattern(/^\d{4}$/)
      .required()
      .messages({
        "string.pattern.base": "Expiration year must be a 4-digit number.",
      }),
    cvv: Joi.string()
      .pattern(/^\d{3,4}$/)
      .required()
      .messages({
        "string.pattern.base": "CVV must be 3 or 4 digits.",
      }),
  }),
};

module.exports = paymentReqBodySchema;
