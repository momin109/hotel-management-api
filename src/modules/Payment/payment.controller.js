import PaymentService from "./payment.service.js";

/**
 * Create payment for an invoice
 */
export const createPaymentController = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const payment = await PaymentService.createPayment(invoiceId, req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error); // better to send to global error handler
  }
};

/**
 * Get all payments by invoice
 */
export const getInvoicePaymentsController = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const payments = await PaymentService.getPaymentsByInvoice(invoiceId);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

/**
 * Process refund for an invoice
 */
export const processRefundController = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const refund = await PaymentService.processRefund(invoiceId, req.body);
    res.status(201).json(refund);
  } catch (error) {
    next(error);
  }
};

/**
 * Get payment summary with optional filters
 */
export const getPaymentSummaryController = async (req, res, next) => {
  try {
    const { from, to, method } = req.query;
    const filter = {};

    if (from && to) {
      filter.paymentDate = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    if (method) filter.paymentMethod = method;

    const summary = await PaymentService.getPaymentSummary(filter);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};
