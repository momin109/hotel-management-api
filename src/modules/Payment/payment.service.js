import Payment from "./payment.model.js";
import Invoice from "../invoice/invoice.model.js";

// create new payment for an invoice

export const createPayment = async (invoiceId, paymentData) => {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) throw new Error("Invoice not found");

  const payment = new Payment({
    invoiceId,
    ...paymentData,
  });

  await payment.save();

  //Update invoice paid amount and status

  const totalPaid = await getTotalPaidAmount(invoiceId);
  invoiceId.paidAmount = totalPaid;

  if (totalPaid >= invoice.totalAmount) {
    invoice.status = "paid";
  } else if (totalPaid > 0) {
    invoice.status = "partial";
  }

  await invoice.save();

  return payment;
};

// calculator total paid amount for an invoice

export const getTotalPaidAmount = async (invoiceId) => {
  const result = await Payment.aggregate([
    {
      $match: {
        invoiceId: new mongoose.Types.ObjectId(invoiceId),
        status: "completed",
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return result.length > 0 ? result[0].total : 0;
};

/**
 * Get payments list by invoiceId
 */

export const getPaymentsByInvoice = async (invoiceId) => {
  return await Payment.find({ invoiceId })
    .populate("receivedBy")
    .sort({ paymentDate: -1 });
};

// Process a refund

export const processRefund = async (invoiceId, refundData) => {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) throw new Error("Invoice not found");

  if (invoice.paidAmount < refundData.amount) {
    throw new Error("Refund amount exceeds paid amount");
  }

  const refund = new Payment({
    invoiceId,
    amount: -Math.abs(refundData.amount),
    paymentMethod: refundData.paymentMethod,
    notes: refundData.notes || "Refund processed",
    status: "refunded",
    receivedBy: refundData.processedBy,
  });

  await refund.save();

  // update invoice status
  const totalPaid = await getTotalPaidAmount(invoiceId);
  invoice.paidAmount = totalPaid;

  if (refundData.fullRefund) {
    invoice.status = "refunded";
  } else {
    invoice.status = totalPaid > 0 ? "partial" : "pending";
  }

  await invoice.save();
};
