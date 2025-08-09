const express = require("express");
const router = express.Router();
const PaymentController = require("./payment.controller");
const { authenticate, authorize } = require("../../middleware/auth");

router.post(
  "/:invoiceId",
  authenticate,
  authorize("admin"),
  PaymentController.createPayment
);
router.get("/:invoiceId", authenticate, PaymentController.getInvoicePayments);
router.post(
  "/:invoiceId/refund",
  authenticate,
  authorize("admin"),
  PaymentController.processRefund
);
router.get(
  "/summary",
  authenticate,
  authorize("admin"),
  PaymentController.getPaymentSummary
);

module.exports = router;
