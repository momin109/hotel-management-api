const express = require("express");
const router = express.Router();
const InvoiceController = require("./invoice.controller");
const { authenticate, authorize } = require("../../middleware/auth");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  InvoiceController.createInvoice
);
router.get("/:id", authenticate, InvoiceController.getInvoice);
router.get(
  "/customer/:customerId",
  authenticate,
  InvoiceController.getCustomerInvoices
);
router.get(
  "/",
  authenticate,
  authorize("admin"),
  InvoiceController.getAllInvoices
);
router.get("/:id/download", authenticate, InvoiceController.downloadInvoicePdf);

module.exports = router;
