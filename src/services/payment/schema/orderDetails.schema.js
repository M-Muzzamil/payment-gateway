const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema({
  transactionId: {
    type: String,
    required: [true, "Transaction id is required"],
  },
  amount: {
    type: Number,
    requierd: [true, "Amount is required"],
    default: 0.0,
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
  },
  paymentSuccess: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("OrderDetails", OrderDetailsSchema);
