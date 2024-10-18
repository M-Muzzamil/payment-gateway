// test/payment.test.js
const request = require("supertest");
const server = require("../server");
const app = require("../app");

describe("Payment API", () => {
  describe("POST /payment", () => {
    it("should return success for a valid payment", async () => {
      const validPaymentData = {
        amount: "150",
        currency: "USD",
        customerName: "muzzamil",
        cardHolderName: "Muh muz",
        cardNumber: "5555555555554444",
        expirationMonth: "11",
        expirationYear: "2025",
        cvv: "123",
      };

      const response = await request(app)
        .post("/payment")
        .send(validPaymentData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("code", 200);
      expect(response.body.data).toHaveProperty("transactionId");
    });

    it("should return error for invalid expiration date", async () => {
      const invalidPaymentData = {
        amount: "150.75",
        currency: "USD",
        customerName: "Muhammad Muzzamil",
        cardHolderName: "Muhammad Muzzamil",
        cardNumber: "4242424242424242",
        expirationMonth: "05",
        expirationYear: "2024",
        cvv: "123",
      };

      const response = await request(app)
        .post("/payment")
        .send(invalidPaymentData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("code", 400);
      expect(response.body.error).toHaveProperty("message", "Payment Failed");
      expect(response.body.error).toHaveProperty(
        "reason",
        "Invalid Expiry Date"
      );
    });
  });
});
