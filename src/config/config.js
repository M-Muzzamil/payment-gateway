const dotenv = require("dotenv");

dotenv.config();
const config = {
  mode: process.env.NODE_ENV === "dev" ? "sandbox" : "",
  port: process.env.PORT,
  mongoUsername: process.env.MONGO_DB_USERNAME,
  mongoPassword: process.env.MONGO_DB_PASSWORD,
  mongoCluster: process.env.MONGO_DB_CLUSTER,
  mongoDbName: process.env.MONGO_DB_NAME,
  paypalBaseUrl: process.env.PAYPAL_BASE_URL,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  braintreeMerchantId: process.env.BRAINTREE_MERCHANT_ID,
  braintreePublicKey: process.env.BRAINTREE_PUBLIC_KEY,
  braintreePrivateKey: process.env.BRAINTREE_PRIVATE_KEY,
};

module.exports = config;
